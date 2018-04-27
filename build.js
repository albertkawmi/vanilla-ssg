const fs = require('fs')
const { minify } = require('html-minifier')
const config = require('./config')
const Page = require('./components/Page')

const environment = process.env.NODE_ENV || 'production'

Object.entries(config.pages)
  .forEach(([fileName, pageConfig]) => {
    const page = Page(pageConfig)
    const renderedPage = (environment === 'production')
      ? minify(page, config.minify)
      : page

    fs.writeFileSync(`./dist/${fileName}`, renderedPage)
  })

// TODO: images pipeline

console.log('Build complete!')
