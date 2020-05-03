const { getCurrentContext } = require('../renderContext')

function createVNodeTree(Component) {
  const context = getCurrentContext()
  let result = Component({}, context)
  if (result instanceof Promise) {
    return {
      nodeType: 'PROMISE',
      props: {
        promise: result,
      },
    }
  }
  return result
}

module.exports = {
  createVNodeTree,
}
