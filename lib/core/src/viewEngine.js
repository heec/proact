const { babelConfig } = require('./config')
const { renderNodeTreeToString } = require('./renderNodeTree')
const { createRenderContext } = require('./renderContext')

function createViewEngine(engineOptions) {
  let registered = false
  return function (filename, options, callback) {
    if (!registered) {
      require('@babel/register')({
        only: [].concat(options.settings.views),
        ...babelConfig,
      })
      registered = true
    }

    async function handleAsycView() {
      let content
      try {
        let component = require(filename)
        component = component.default || component
        content = await renderNodeTreeToString(component)
      } catch (err) {
        console.log('ERROR', err)
        return callback(err)
      }
      return callback(null, content)
    }
    createRenderContext(options, handleAsycView)
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
