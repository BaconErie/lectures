// Export PDFs for all lectures and build a registry.
// Run from repo root: `node scripts/export-pdfs.mjs`

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REPO_ROOT = path.resolve(__dirname, '..')
const LECTURES_DIR = path.join(REPO_ROOT, 'lectures')
const OUTPUT_DIR = path.join(REPO_ROOT, 'dist-pdf')

function slugify(basename) {
  return basename
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function tryImportGrayMatter() {
  try {
    const mod = await import('gray-matter')
    return mod.default || mod
  } catch {
    return null
  }
}

function parseYamlLite(yamlText) {
  const result = {}
  const lines = yamlText.split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/)
    if (!m) continue
    const key = m[1]
    let value = m[2]
    if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (!Number.isNaN(Number(value))) value = Number(value)
    else if (/^\[.*\]$/.test(value)) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    }
    result[key] = value
  }
  return result
}

async function extractFrontmatter(markdown, grayMatter) {
  const fmMatch = markdown.match(/^---\n([\s\S]*?)\n---\n?/) // leading frontmatter only
  if (grayMatter) {
    try {
      const parsed = grayMatter(markdown)
      return { data: parsed.data || {}, body: parsed.content || markdown }
    } catch {
      // fall through to lite parser
    }
  }
  if (fmMatch) {
    const fmText = fmMatch[1]
    const data = parseYamlLite(fmText)
    const body = markdown.slice(fmMatch[0].length)
    return { data, body }
  }
  return { data: {}, body: markdown }
}

function countSlides(body) {
  // naive: count slide separators `---` at column 0, not including code fences
  const lines = body.split(/\r?\n/)
  let inCode = false
  let count = 1
  for (const line of lines) {
    if (/^```/.test(line)) inCode = !inCode
    else if (!inCode && /^---\s*$/.test(line)) count += 1
  }
  return Math.max(count, 1)
}

function firstHeading(body) {
  const m = body.match(/^\s*#\s+(.+)$/m)
  return m ? m[1].trim() : null
}

function run(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: REPO_ROOT, stdio: ['ignore', 'pipe', 'pipe'], ...options })
    let stdout = ''
    let stderr = ''
    if (child.stdout) child.stdout.on('data', d => (stdout += d.toString()))
    if (child.stderr) child.stderr.on('data', d => (stderr += d.toString()))
    child.on('close', code => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}\n${stderr}`))
    })
  })
}

async function exportPdf(entryPath, outPath) {
  const args = ['-y', 'slidev', 'export', entryPath, '--output', outPath]
  await run('npx', args)
}

async function gitLastModifiedIso(filePath) {
  try {
    const { stdout } = await run('git', ['log', '-1', '--format=%cI', '--', filePath])
    return stdout.trim() || null
  } catch {
    return null
  }
}

async function gitLastCommitSha(filePath) {
  try {
    const { stdout } = await run('git', ['log', '-1', '--format=%H', '--', filePath])
    return stdout.trim() || null
  } catch {
    return null
  }
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  let entries = []
  try {
    entries = await fs.readdir(LECTURES_DIR)
  } catch (e) {
    console.error(`Lectures directory not found: ${LECTURES_DIR}`)
    process.exitCode = 1
    return
  }

  const markdownFiles = entries.filter(f => f.endsWith('.md') && f !== 'example.md')

  if (markdownFiles.length === 0) {
    console.log('No lecture markdown files found (excluding example.md).')
  }

  const grayMatter = await tryImportGrayMatter()

  const registryItems = []

  for (const filename of markdownFiles) {
    const sourcePath = path.join('lectures', filename)
    const absoluteSource = path.join(REPO_ROOT, sourcePath)
    const basename = path.basename(filename, path.extname(filename))
    const id = slugify(basename)
    const pdfFilename = `${id}.pdf`
    const pdfPath = path.join(OUTPUT_DIR, pdfFilename)

    const content = await fs.readFile(absoluteSource, 'utf8')
    const { data: fm, body } = await extractFrontmatter(content, grayMatter)

    const slideCount = countSlides(body)
    const title = fm.title || firstHeading(body) || basename
    const description = fm.description || ''
    const tags = Array.isArray(fm.tags)
      ? fm.tags
      : typeof fm.tags === 'string'
        ? fm.tags.split(',').map(s => s.trim()).filter(Boolean)
        : []

    console.log(`Exporting ${sourcePath} -> ${path.relative(REPO_ROOT, pdfPath)}`)
    await exportPdf(absoluteSource, pdfPath)
    const stat = await fs.stat(pdfPath)
    const lastModified = (await gitLastModifiedIso(sourcePath)) || new Date(stat.mtimeMs).toISOString()
    const lastSha = await gitLastCommitSha(sourcePath)

    registryItems.push({
      id,
      title,
      description,
      source: sourcePath,
      pdf: pdfFilename,
      pdfSizeBytes: stat.size,
      slideCount,
      lastModified,
      lastCommit: lastSha,
      meta: {
        date: fm.date || null,
        authors: fm.author || fm.authors || null,
        cover: fm.cover || fm.image || null,
        theme: fm.theme || null,
        tags
      }
    })
  }

  const registry = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    items: registryItems
  }

  await fs.writeFile(path.join(OUTPUT_DIR, 'registry.json'), JSON.stringify(registry, null, 2) + '\n')

  // Also generate a simple README
  const lines = [
    '# Lecture PDFs',
    '',
    'This branch contains exported PDFs and a `registry.json` with metadata.',
    '',
    ...registryItems.map(i => `- ${i.title} (${i.slideCount} slides) — [PDF](./${i.pdf})`)
  ]
  await fs.writeFile(path.join(OUTPUT_DIR, 'README.md'), lines.join('\n') + '\n')

  console.log(`\nWrote registry for ${registryItems.length} item(s) to dist-pdf/registry.json`)
}

main().catch(err => {
  console.error(err)
  process.exitCode = 1
})


