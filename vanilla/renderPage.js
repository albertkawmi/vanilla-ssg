const { readFile } = require('./fileSystem')
const postCss = require('./postCss')

async function renderPage ({
  title = 'Untitled Page',
  head = '',
  scriptFiles = [],
  cssFiles = [],
  body,
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
      ${await renderStyleTags(cssFiles)}
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
const renderStyleTags = async (cssFiles) => {
  const processCssFiles = cssFiles.map(async (path) => {
    const css = await readFile(`${process.cwd()}/${path}`, { encoding: 'utf8' })
    return `<style>${await postCss(css)}</style>`
  })

  const styleTags = await Promise.all(processCssFiles)

  return styleTags.join('')
}

const renderScriptTags = async (scriptPaths = []) => {
  const readScriptFiles = scriptPaths.map(async ({ path, inline }) => {
    if (inline) {
      const script = await readFile(`${process.cwd()}/${path}`)
      return `<script type="text/javascript">${script}</script>`
    }
    // TODO: create config API for additional script tag attributes e.g. 'defer'
    return `<script type="text/javascript" src="${path}"></script>`
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
