import type { CodeRunnerProviders } from '@slidev/types'
import { defineCodeRunnersSetup } from '@slidev/types'

// HTML runner rendered in an isolated iframe so deck styles don't leak in
// NOTE: Slidev does NOT sanitize HTML for you. Only use with trusted content.
export default defineCodeRunnersSetup((runners: CodeRunnerProviders) => {
  return {
    ...runners,
    html(code) {
      const iframe = document.createElement('iframe')
      // isolate from the deck's CSS
      iframe.setAttribute('sandbox', 'allow-scripts allow-forms allow-popups')
      iframe.style.width = '100%'
      iframe.style.height = '300px'
      iframe.style.border = '0'
      iframe.style.backgroundColor = 'transparent'

      const srcdoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body { margin: 0; padding: 6px; background: #ffffff; color: #111827; }
      body { font: 14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
    </style>
  </head>
  <body>
    ${code}
  </body>
</html>`

      iframe.srcdoc = srcdoc

      return [{ element: iframe }]
    },
  }
})


