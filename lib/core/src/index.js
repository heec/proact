const {
  createElement,
  createFragment,
} = require('./nodeTree/createElement')
const ProactRenderer = require('./renderToHtml/ProactRenderer')
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
  ProactRenderer,
  contentCache,
  // utils
  readTextFile,
  readJsonFile,
  // built in components
  Cache,
  UnsafeHtml,
}
