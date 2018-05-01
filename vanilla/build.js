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
      const page = renderPage(pageConfig)
      const renderedPage = (environment === 'production')
        ? minify(page, config.minify)
        : page

      return await writeFileToPath(`${distDir}/${pagePath}`, renderedPage)
    })

  await Promise.all(allPages)

  /* eslint-disable no-console */
  console.log('\n👍  Build complete!\n')
}

renderPages()
