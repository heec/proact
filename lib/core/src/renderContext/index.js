const cls = require('cls-hooked')

const namespace = 'renderContext'
const defaultContext = 'context'
const contextNamespace = cls.createNamespace(namespace)

function setCurrentContext(contextObject) {
  contextNamespace.set(defaultContext, { ...contextObject })
}

function getCurrentContext() {
  const ctx = cls.getNamespace(namespace)
  return ctx.get(defaultContext)
}

module.exports = {
  contextNamespace,
  setCurrentContext,
  getCurrentContext,
}
