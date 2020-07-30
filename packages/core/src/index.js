const {
  createElement,
  createFragment,
} = require('./nodeTree/createElement')
const { createRenderer } = require('./renderToHtml')
const { Cache, contentCache } = require('./components/Cache')
const { UnsafeHtml } = require('./components/UnsafeHtml')
const { readTextFile, readJsonFile } = require('./utils/readFiles')
const {
  expressViewEngine,
  initializeViewEngine,
} = require('./expressViewEngine')

module.exports = {
  h: createElement,
  f: createFragment,
  expressViewEngine,
  initializeViewEngine,
  createRenderer,
  contentCache,
  // utils
  readTextFile,
  readJsonFile,
  // built in components
  Cache,
  UnsafeHtml,
}
