const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

module.exports = async (css, from) => {
  return await postcss([ autoprefixer ]).process(css, { from }).then((result) => {
      result.warnings()
        .forEach((warn) => console.warn(warn.toString()))

      return result.css
  })
}
