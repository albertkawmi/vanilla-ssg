#!/usr/bin/env node
const build = require('./build')
const dev = require('./dev')
const colors = require('colors')

const cmd = process.argv[2]

console.log(colors.yellow('Vanilla'), colors.green('SSG'))

const { NODE_ENV } = process.env

switch (cmd) {
  case 'build':
    console.log('Creating a production build...')
    build({ env: NODE_ENV || 'production' })
    break
  case 'dev':
    console.log('Creating a development build and starting a local server')
    dev({ env: NODE_ENV || 'development' })
    break
  default:
    console.error(`Invalid command: vanilla-ssg ${cmd}`)
}
