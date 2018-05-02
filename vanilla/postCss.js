const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

module.exports = async (css) => {
  return await postcss([ autoprefixer ]).process(css).then((result) => {
      result.warnings()
        .forEach((warn) => console.warn(warn.toString()))

      return result.css
  })
}
