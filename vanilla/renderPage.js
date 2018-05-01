const fs = require('fs')

const renderPage = ({
  title = 'Untitled Page',
  head = '',
  scriptFiles = [],
  cssFiles = [],
  body,
}) => {
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
      ${renderStyleTags(cssFiles)}
    </head>
    <body>
      ${renderBody(body)}
      ${renderScriptTags(scriptFiles)}
    </body>
    </html>
  `
  return rendered
}

// TODO: add inline config option for CSS (as per scripts below)
const renderStyleTags = (cssFiles) => {
  const styleTags = cssFiles.map(path => {
    const css = fs.readFileSync(`${process.cwd()}/${path}`, { encoding: 'utf8' })
    return `<style>${css}</style>`
  })

  return styleTags.join('')
}

const renderScriptTags = (scriptPaths = []) => {
  const scriptTags = scriptPaths.map(({ path, inline }) => {
    if (inline) {
      const script = fs.readFileSync(`${process.cwd()}/${path}`)
      return `<script type="text/javascript">${script}</script>`
    }
    // TODO: create config API for additional script tag attributes e.g. 'defer'
    return `<script type="text/javascript" src="${path}"></script>`
  })

  return scriptTags.join('')
}

// TODO: pass route / other data to render component
const renderBody = pathToComponent => {
  const render = require(`${process.cwd()}/${pathToComponent}`)
  return render()
}

module.exports = renderPage
