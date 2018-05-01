const deepmerge = require('deepmerge')

const cwd = process.cwd()
const optionsConfig = require(`${cwd}/vanilla.options`)
const pagesConfig = require(`${cwd}/vanilla.pages`)

const defaultOptions = {}

const { common, ...pages } = pagesConfig

const config = {
  ...defaultOptions,
  ...(optionsConfig ),
  pages: mergePageConfig(common, pages)
}

module.exports = config

function mergePageConfig(defaultPageConfig, allPages) {
  return Object.entries(allPages)
    .reduce((all, [fileName, pageConfig]) => ({
      ...all,
      [fileName]: {
        ...deepmerge(defaultPageConfig, pageConfig),
        head: common.head.concat(pageConfig.head),
      }
    }), {})
}
