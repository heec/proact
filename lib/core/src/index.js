const {
  createElement,
  createFragment,
} = require('./nodeTree/createElement')
const { Cache, contentCache } = require('./components/Cache')
const { UnsafeHtml } = require('./components/UnsafeHtml')
const { readTextFile, readJsonFile } = require('./utils/readFiles')
const {
  createViewEngine,
  initializeViewEngine,
} = require('./expressViewEngine')

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
