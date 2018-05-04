const { readFile } = require('./fileSystem')
const postCss = require('./postCss')

async function renderPage ({
  title = 'Untitled Page',
  head = '',
  scriptFiles = [],
  cssFiles = [],
  body,
  buildConfig,
}) {
  if (!body) {
    throw new Error('Unable to render page: no body component specified.')
  }

  const rendered = // html
  `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      ${head}
      ${await renderStyleTags(cssFiles, buildConfig.autoprefixer)}
    </head>
    <body>
      ${await renderBody(body)}
      ${await renderScriptTags(scriptFiles)}
    </body>
    </html>
  `
  return rendered
}

// TODO: add inline config option for CSS (as per scripts below)
const renderStyleTags = async (cssFiles, autoprefixerConfig) => {
  const { enabled, options } = autoprefixerConfig
  if (!enabled) return ''
  const processCssFiles = cssFiles.map(async (path) => {
    const fullPath = `${process.cwd()}/${path}`
    const css = await readFile(fullPath, { encoding: 'utf8' })
    return `<style>${await postCss(css, fullPath, options)}</style>`
  })

  const styleTags = await Promise.all(processCssFiles)

  return styleTags.join('')
}

const renderScriptTags = async (scriptPaths = []) => {
  const readScriptFiles = scriptPaths.map(async (path) => {
    const script = await readFile(`${process.cwd()}/${path}`)
    return `<script type="text/javascript">${script}</script>`
  })

  const scriptTags = await Promise.all(readScriptFiles)

  return scriptTags.join('')
}

// TODO: pass route / other data to render component
const renderBody = pathToComponent => {
  const render = require(`${process.cwd()}/${pathToComponent}`)
  return Promise.resolve(render())
}

module.exports = renderPage
