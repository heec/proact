const { createElement, createFragment } = require('./createElement')
const { Cache, contentCache } = require('./components/Cache')
const { UnsafeHtml } = require('./components/UnsafeHtml')
const { readTextFile, readJsonFile } = require('./readFiles')
const {
  createViewEngine,
  initializeViewEngine,
} = require('./viewEngine')

module.exports = {
  createViewEngine,
  initializeViewEngine,
  h: createElement,
  f: createFragment,
  contentCache,
  // utils
  readTextFile,
  readJsonFile,
  // built in components
  Cache,
  UnsafeHtml,
}
