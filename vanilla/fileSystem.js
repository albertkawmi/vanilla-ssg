const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const ncp = require('ncp')

const removeDir = require('rmfr')
const makeDir = require('mkdirp-promise')
const pathExists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const copyDir = promisify(ncp)

module.exports = {
  // promisified file system APIs
  removeDir,
  makeDir,
  pathExists,
  readFile,
  writeFile,
  copyDir,

  // convenience helpers
  clearDirectory,
  writeFileToPath,
}

async function writeFileToPath(pathToFile, contents) {
  await makeDir(path.dirname(pathToFile))

  return writeFile(pathToFile, contents)
}

async function clearDirectory(dir) {
  if (await pathExists(dir)) {
    await removeDir(dir)
  }

  return makeDir(dir)
}
