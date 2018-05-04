const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

module.exports = async (css, from, options) => {
  return await postcss([ autoprefixer(options) ]).process(css, { from }).then((result) => {
      result.warnings()
        .forEach((warn) => console.warn(warn.toString()))

      return result.css
  })
}
