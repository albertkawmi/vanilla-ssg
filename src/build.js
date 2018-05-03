const { minify } = require('html-minifier')
const ip = require('ip')
const pretty = require('pretty')
const config = require('./parseConfig')
const renderPage = require('./renderPage')

const {
  clearDirectory,
  copyDir,
  writeFileToPath
} = require('./fileSystem')

async function build({ env }) {
  // Create ./dist folder
  const distDir = `${process.cwd()}/dist`
  await clearDirectory(distDir)

  // Copy static files
  const source = config.staticFiles
  await copyDir(source, distDir)

  // Render page HTML files
  const allPages = Object.entries(config.pages)
    .map(async ([pagePath, pageConfig]) => {
      const page = await renderPage(pageConfig)

      const renderedPage = (env === 'production')
        ? minify(page, config.minify)
        : pretty(withLiveReload(page), { ocd: true })

      const trimmedPath = pagePath.replace(/^\/|\/$/g, '')
      const [end] = trimmedPath.split('/').reverse()
      const isFile = /\.[a-zA-Z0-9]+$/.test(end)

      const writePath = isFile ? trimmedPath : `${trimmedPath}/index.html`

      return await writeFileToPath(`${distDir}/${writePath}`, renderedPage)
    })

  await Promise.all(allPages)

  /* eslint-disable no-console */
  console.log(`
    👍  Build complete!
    ⏱  ${new Date()}
  `)

  return Promise.resolve()
}

module.exports = build

// TODO: parameterise livereload port
const liveReloadScript = (port = 35729) => // html
  `
  <script src="http://${ip.address()}:${port}/livereload.js?snipver=1"></script>
  `

const withLiveReload = page => page.replace(
  '</body>',
  `${liveReloadScript()}</body>`
)
