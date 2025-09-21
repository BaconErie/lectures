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
const SITE_DIR = path.join(REPO_ROOT, 'dist-site')
const PDF_DIR = path.join(SITE_DIR, 'pdfs')
const DECKS_DIR = path.join(SITE_DIR, 'decks')

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

async function buildSpa(entryPath, outDir, basePath) {
  const args = ['-y', 'slidev', 'build', entryPath, '--out', outDir]
  if (basePath) {
    args.push('--base', basePath)
  }
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
  await fs.mkdir(PDF_DIR, { recursive: true })
  await fs.mkdir(DECKS_DIR, { recursive: true })

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
    const pdfPath = path.join(PDF_DIR, pdfFilename)

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

    console.log(`Exporting PDF ${sourcePath} -> ${path.relative(REPO_ROOT, pdfPath)}`)
    await exportPdf(absoluteSource, pdfPath)

    const deckOutDir = path.join(DECKS_DIR, id)
    const basePath = `/decks/${id}/`
    console.log(`Building SPA  ${sourcePath} -> ${path.relative(REPO_ROOT, deckOutDir)} (base ${basePath})`)
    await buildSpa(absoluteSource, deckOutDir, basePath)
    const stat = await fs.stat(pdfPath)
    const lastModified = (await gitLastModifiedIso(sourcePath)) || new Date(stat.mtimeMs).toISOString()
    const lastSha = await gitLastCommitSha(sourcePath)

    registryItems.push({
      id,
      title,
      description,
      source: sourcePath,
      pdf: `pdfs/${pdfFilename}`,
      spa: `decks/${id}/`,
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

  await fs.writeFile(path.join(SITE_DIR, 'registry.json'), JSON.stringify(registry, null, 2) + '\n')

  // Also generate a simple README
  const lines = [
    '# Lectures',
    '',
    'This site contains interactive decks and downloadable PDFs with a `registry.json` of metadata.',
    '',
    ...registryItems.map(i => `- ${i.title} (${i.slideCount} slides) — [Deck](./${i.spa}) | [PDF](./${i.pdf})`)
  ]
  await fs.writeFile(path.join(SITE_DIR, 'README.md'), lines.join('\n') + '\n')

  // Write brand assets (CSS + logo) inspired by tjdev.club
  await fs.mkdir(path.join(SITE_DIR, 'assets'), { recursive: true })
  const siteCss = `:root{--bg:#ffffff;--text:#0f172a;--muted:#64748b;--border:#e5e7eb;--primary:#0ea5e9;--primary-600:#0284c7;--card:#f8fafc}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.6}
.top-accent{height:4px;background:linear-gradient(90deg,var(--primary),var(--primary-600))}
.container{max-width:1040px;margin:0 auto;padding:24px}
.header{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit}
.brand img{width:36px;height:36px}
.brand .title{font-weight:700;font-size:18px}
.brand .subtitle{font-size:12px;color:var(--muted)}
.nav a{color:var(--muted);text-decoration:none;margin-left:16px}
.nav a:hover{color:var(--primary)}
.intro{margin:6px 0 18px;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:16px}
.card h3{margin:0 0 6px;font-size:16px}
.meta{color:var(--muted);font-size:12px;margin:0 0 8px}
.actions a{display:inline-block;margin-right:12px;color:var(--primary);text-decoration:none}
.actions a:hover{text-decoration:underline}
footer{border-top:1px solid var(--border);margin-top:24px;padding-top:12px;color:var(--muted);font-size:12px}`
  const logoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" rx="20" fill="url(#g)"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0ea5e9"/>
      <stop offset="1" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <g>
    <path d="M30 80 V40 h14 q12 0 12 12 q0 8 -8 10 l12 18 h-10 l-10 -16 h-6 V80 Z" fill="#ffffff"/>
    <path d="M66 80 V40 h24 v8 h-16 v8 h14 v8 h-14 v16 h-8 Z" fill="#ffffff"/>
  </g>
  <title>TJ Dev Club</title>
</svg>`
  await fs.writeFile(path.join(SITE_DIR, 'assets', 'site.css'), siteCss)
  await fs.writeFile(path.join(SITE_DIR, 'assets', 'logo.svg'), logoSvg)

  // Generate an index.html with branding
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TJ Dev Club Lectures</title>
    <link rel="stylesheet" href="./assets/site.css">
    <link rel="icon" type="image/svg+xml" href="./assets/logo.svg">
  </head>
  <body>
    <div class="top-accent"></div>
    <div class="container">
      <header class="header">
        <a class="brand" href="./">
          <img src="./assets/logo.svg" alt="TJ Dev Club logo">
          <div>
            <div class="title">TJ Dev Club Lectures</div>
            <div class="subtitle">Interactive decks and downloadable PDFs</div>
          </div>
        </a>
        <nav class="nav">
          <a href="./registry.json">Registry</a>
          <a href="https://tjdev.club" target="_blank" rel="noopener">tjdev.club</a>
        </nav>
      </header>

      <p class="intro">Browse the latest lectures. Each entry links to the interactive deck and a PDF export.</p>

      <section class="grid">
        ${registryItems.map(i => `
        <article class="card">
          <h3>${i.title.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</h3>
          ${i.description ? `<p class=\"meta\">${String(i.description).replace(/&/g,'&amp;').replace(/</g,'&lt;')}</p>` : ''}
          <p class="meta">${i.slideCount} slides${i.meta?.authors ? ` • ${Array.isArray(i.meta.authors) ? i.meta.authors.join(', ') : i.meta.authors}` : ''}${i.lastModified ? ` • updated ${new Date(i.lastModified).toLocaleDateString()}` : ''}</p>
          <div class="actions">
            <a href="./${i.spa}">Open Deck</a>
            <a href="./${i.pdf}">Download PDF</a>
          </div>
        </article>`).join('')}
      </section>

      <footer>
        © ${new Date().getFullYear()} TJ Dev Club
      </footer>
    </div>
  </body>
  </html>`
  await fs.writeFile(path.join(SITE_DIR, 'index.html'), indexHtml)

  console.log(`\nWrote registry for ${registryItems.length} item(s) to dist-site/registry.json`)
}

main().catch(err => {
  console.error(err)
  process.exitCode = 1
})


