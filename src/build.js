const { minify: minifyHtml } = require('html-minifier')
const ip = require('ip')
const prettyHtml = require('pretty')
const { pages: pagesConfig, options: buildConfig } = require('./parseConfig')
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
  const source = buildConfig.staticFiles
  await copyDir(source, distDir)

  // Render page HTML files
  const allPages = Object.entries(pagesConfig)
    .map(async ([pagePath, pageConfig]) => {
      const page = await renderPage({ ...pageConfig, buildConfig })
      const builtPage = buildProcess({ page, buildConfig, env })
      const writePath = getWritePath(pagePath)

      return await writeFileToPath(`${distDir}/${writePath}`, builtPage)
    })

  await Promise.all(allPages)

  /* eslint-disable no-console */
  console.log(`
    👍  Build complete
    ⏱  ${new Date()}
  `)

  return Promise.resolve()
}

// TODO: refactor this to a functional pipeline
function buildProcess({ page, buildConfig, env }) {
  const { minify, pretty, livereload } = buildConfig

  const isProd = env === 'production'
  const shouldMinifyHtml = isProd && minify.enabled
  const shouldPrettifyHtml = !isProd && pretty.enabled
  const shouldLivereload = !isProd && livereload.enabled

  let builtPage = page

  if (shouldLivereload) {
    builtPage = withLivereload(builtPage, livereload.options)
  }

  if (shouldMinifyHtml) {
    builtPage = minifyHtml(builtPage, minify.options)
  }

  if (shouldPrettifyHtml) {
    builtPage = prettyHtml(builtPage, pretty.options)
  }

  return builtPage
}

function getWritePath(pagePath) {
  const trimmedPath = pagePath.replace(/^\/|\/$/g, '')
  const end = trimmedPath.split('/').pop()
  const isFile = /\.[a-zA-Z0-9]+$/.test(end)

  const writePath = isFile
    ? trimmedPath
    : [trimmedPath, 'index.html'].join('/')

  return writePath
}

function withLivereload(page, options = {}) {
  const host = ip.address() || 'localhost'
  const port = options.port || 35729
  const scriptSrc = `http://${host}:${port}/livereload.js?snipver=1`

  const scriptTag = // html
  `
  <script src="${scriptSrc}"></script>
  `

  return page.replace(
    '</body>',
    `${scriptTag}</body>`
  )
}

module.exports = build
