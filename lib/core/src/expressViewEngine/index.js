const { babelConfig } = require('../config')
const ProactRenderer = require('../renderToHtml/ProactRenderer')

function createViewEngine(engineOptions) {
  console.log('create view engine', engineOptions)
  const renderer = new ProactRenderer(engineOptions.views)

  return function (filename, options, callback) {
    async function renderAsync(filename, options, callback) {
      const content = await renderer.renderToString(filename, options)
      callback(null, content)
    }
    renderAsync(filename, options, callback)
  }
}

const defaultOptions = {
  views: 'views',
  dev: true,
}

function initializeViewEngine(app, userOptions) {
  const options = { ...defaultOptions, ...userOptions }
  const viewEngine = createViewEngine(options)
  app.engine('jsx', viewEngine)
  app.set('views', options.views)
  app.set('view engine', 'jsx')
}

module.exports = {
  createViewEngine,
  initializeViewEngine,
}
