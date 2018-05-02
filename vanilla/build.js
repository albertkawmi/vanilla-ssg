const { minify } = require('html-minifier')
const config = require('./parseConfig')
const renderPage = require('./renderPage')

const {
  clearDirectory,
  copyDir,
  writeFileToPath
} = require('./fileSystem')


async function renderPages() {
  const environment = process.env.NODE_ENV || 'production'

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
      const renderedPage = (environment === 'production')
        ? minify(page, config.minify)
        : page

      const trimmedPath = pagePath.replace(/^\/|\/$/g, '')
      const [end] = trimmedPath.split('/').reverse()
      const isFile = /\.[a-zA-Z0-9]+$/.test(end)

      const writePath = isFile ? trimmedPath : `${trimmedPath}/index.html`

      return await writeFileToPath(`${distDir}/${writePath}`, renderedPage)
    })

  await Promise.all(allPages)

  /* eslint-disable no-console */
  console.log('\n👍  Build complete!\n')
}

renderPages()
