const path = require('path')
const { babelConfig } = require('../config')
const { createRenderer } = require('../renderToHtml')

function createViewEngine(engineOptions) {
  console.log('create view engine', engineOptions)

  const renderer = createRenderer(engineOptions)

  return function (filename, options, callback) {
    async function renderAsync(filename, options, callback) {
      const start = new Date().getTime()
      const content = await renderer.renderToString(filename, options)

      if (engineOptions.dev) {
        const duration = new Date().getTime() - start
        console.log(
          `/${path
            .relative(require.main.path, filename)
            .replace(/\\/g, '/')} -> ${
            content.length
          } bytes rendered in ${duration}ms`
        )
      }

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
