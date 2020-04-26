const cls = require('cls-hooked')

const namespace = 'renderContext'
const defaultContext = 'context'
const contextNamespace = cls.createNamespace(namespace)

function createRenderContext(contextObject, callback) {
  contextNamespace.bind(contextObject)
  contextNamespace.run(function () {
    contextNamespace.set(defaultContext, { ...contextObject })
    callback()
  })
}

function getCurrentContext() {
  const ctx = cls.getNamespace(namespace)
  return ctx.get(defaultContext)
}

module.exports = {
  getCurrentContext,
  createRenderContext,
}
