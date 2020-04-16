const cls = require('cls-hooked')
function getCurrentContext() {
  const contextNamespace = cls.getNamespace('contextNamespace')
  return contextNamespace.get('context')
}
module.exports = {
  getCurrentContext,
}
