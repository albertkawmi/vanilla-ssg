const chokidar = require('chokidar')
const build = require('./build')
const livereload = require('livereload');
const serve = require('serve')

module.exports = async ({ env }) => {
  const devBuild = () => build({ env })
  await devBuild()

  const cwd = process.cwd()
  const dist = `${cwd}/dist`

  await initLivereload(dist)

  await initFileWatching(cwd, devBuild)

  const devServer = serve(dist, { open: true, clipless: true }) // eslint-disable-line
}

function initLivereload(dist) {
  return new Promise((resolve) => {
    const lrServer = livereload.createServer(
      { delay: 500 },
      () => {
        lrServer.watch(dist)
        resolve()
      }
    )
  })
}

function initFileWatching(cwd, devBuild) {
  return new Promise((resolve) => {
    const watcher = chokidar.watch(cwd, {
      ignoreInitial: true,
      ignored: [
        '/dist',
        '/node_modules',
        '/.git'
      ].map(path => cwd.concat(path))
    })

    watcher
      .on('ready', () => {
        // eslint-disable-next-line
        console.log('Watching for changes in', cwd)
        resolve()
      })
      .on('change', devBuild)
      .on('add', devBuild)
      .on('unlink', devBuild)
      .on('unlinkDir', devBuild)
  })
}
