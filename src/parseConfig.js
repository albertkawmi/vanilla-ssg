const deepmerge = require('deepmerge')

const cwd = process.cwd()
const pagesConfig = require(`${cwd}/vanilla.pages`)
const defaultOptions = require('./defaultOptions')

const optionsConfig = getOptionsConfig()
const { common, ...pages } = pagesConfig

const config = {
  options: deepmerge(defaultOptions, optionsConfig),
  pages: mergePageConfig(common, pages)
}

module.exports = config

function getOptionsConfig() {
  try {
    return require(`${cwd}/vanilla.options`)
  } catch (e) {
    return {}
  }
}

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
