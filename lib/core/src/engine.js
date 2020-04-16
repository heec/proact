const render = require('./render')
const vdom = require('./vDom')
const cls = require('cls-hooked')
const contextNamespace = cls.createNamespace('contextNamespace')

function createContext(options) {
  return {
    ...options,
  }
}

module.exports = function (engineOptions) {
  let registered = false
  return function (filename, options, callback) {
    if (!registered) {
      console.log('@babel/register')
      require('@babel/register')({ only: [].concat(options.settings.views), ...engineOptions.babelConfig })
      registered = true
    }

    async function handleAsycView() {
      let content
      try {
        let component = require(filename)
        component = component.default || component
        content = await render.renderToString(component)
      } catch (err) {
        return callback(err)
      }
      return callback(null, content)
    }
    contextNamespace.bind(options)
    contextNamespace.run(function () {
      const context = createContext(options)
      contextNamespace.set('context', context)
      handleAsycView()
    })
  }
}
