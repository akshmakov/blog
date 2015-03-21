//
// Render input Markdown file as HTML.
//

import concat from 'stream-concat-promise'
import mdit from 'markdown-it'

const md = mdit({
  html: true,
  typographer: true,
})

md.use(require('markdown-it-anchor'), {
  level: 2, // Do not permalink `<h1>`.
  permalink: true,
})

md.use(require('markdown-it-deflist'))
md.use(require('markdown-it-highlightjs'))
md.use(require('markdown-it-title'))

const env = {}

concat(process.stdin, { encoding: 'string' })
  .then(src => md.render(src, env))
  .then(html => console.log(`<title>${env.title}</title>\n${html}`))
  .then(null, require('promise-done'))
