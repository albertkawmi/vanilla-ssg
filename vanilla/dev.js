const chokidar = require('chokidar')
const build = require('./build')
const livereload = require('livereload');
const serve = require('serve')

module.exports = ({ env }) => {
  const devBuild = () => build({ env })
  devBuild()

  const cwd = process.cwd()

  const lrServer = livereload.createServer();
  lrServer.watch(`${cwd}/dist`);

  const devServer = serve(`${cwd}/dist`, { open: true, clipless: true }) // eslint-disable-line

  const watcher = chokidar.watch(cwd, {
    ignoreInitial: true,
    ignored: [
      '/dist',
      '/node_modules',
      '/.git'
    ].map(path => cwd.concat(path))
  })

  watcher
    .on('ready', () => console.log('Watching for changes in', cwd))
    .on('change', devBuild)
    .on('add', devBuild)
    .on('unlink', devBuild)
    .on('unlinkDir', devBuild)
}
