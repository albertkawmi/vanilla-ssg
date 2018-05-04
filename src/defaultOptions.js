module.exports = {
  staticFiles: 'public',
  livereload: {
    enabled: true,
    options: {},
  },
  minify: {
    enabled: true,
    options: {
      removeAttributeQuotes: true,
      minifyCSS: true,
      minifyJS: true,
      preserveLineBreaks: false,
      collapseWhitespace: true,
      html5: true,
    },
  },
  autoprefixer: {
    enabled: true,
    options: {}, // For advanced use. See https://github.com/postcss/autoprefixer#browsers to configure browser support
  },
  pretty: {
    enabled: true,
    options: { ocd: true }
  }
}
