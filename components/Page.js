const fs = require('fs')

const Page = ({
  title = 'Untitled Page',
  metaTags = {},
  scriptFiles = [],
  cssFiles = [],
  body = () => '<h1>Oops! No body content specified.</h1>',
}) => // html
`
  <!DOCTYPE html>
  <html>
  <head>
    <title>${title}</title>
    ${renderMetaTags(metaTags)}
    ${renderStyleTags(cssFiles)}
  </head>
  <body>
    ${body()}
    ${renderScriptTags(scriptFiles)}
  </body>
  </html>
`

const renderMetaTags = (metaTags = {}) => // html
`
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${
    Object.entries(metaTags)
      .map(([key, value]) => `<meta name="${key}" content="${value}" />`)
      .join('')
  }
`

const renderStyleTags = (cssFiles) => {
  const styleTags = cssFiles.map(fileName => {
    const css = fs.readFileSync(`./styles/${fileName}`, { encoding: 'utf8' })
    return `<style>${css}</style>`
  })

  return styleTags.join('')
}

// TODO: implement this
const renderScriptTags = (scriptPaths = []) => // html
`
  <script>
    (function () {
      var message = 'Hello World!!'
      console.log(message)
    })()
  </script>
`

module.exports = Page
