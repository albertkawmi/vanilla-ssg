const deepmerge = require('deepmerge')

const defaultPage = {
  cssFiles: ['reset.css'],
  scriptFiles: [],
  metaTags: {
    author: 'Albert Kawmi',
    description: 'A default description'
  },
  title: 'A default title',
  body: () => '<h1>Specify this page body in config.js</h1>'
}

const config = {
  pages: {
    'index.html': {
      title: 'Hello',
      metaTags: {
        description: 'The hello page',
      },
      cssFiles: ['exclaim.css'],
      body: require('./pages/index')
    },
    'about.html': {
      title: 'About',
      metaTags: {
        description: 'The about page',
      },
      body: require('./pages/about')
    }
  },
  minify: {
    removeAttributeQuotes: true,
    minifyCSS: true,
    minifyJS: true,
    preserveLineBreaks: false,
    collapseWhitespace: true,
    html5: true,
  },
}

function mergePageConfig(defaultPageConfig, allPages) {
  return Object.entries(allPages)
    .reduce((all, [fileName, pageConfig]) => Object.assign(
      all,
      { [fileName]: deepmerge(defaultPageConfig, pageConfig) }
    ), {})
}

module.exports = Object.assign(
  config,
  { pages: mergePageConfig(defaultPage, config.pages) }
)
