const { getCurrentContext } = require('./context')

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function createFragment(props) {
  return props
}

async function resolveChildren(children) {
  let resolvedChildren = []
  await asyncForEach(children, async (c) => {
    if (Array.isArray(c)) {
      const lc = await resolveChildren(c)
      resolvedChildren = resolvedChildren.concat(lc)
    } else if (c instanceof Promise) {
      const ac = await c
      resolvedChildren.push(ac)
    } else {
      resolvedChildren.push(c)
    }
  })
  return resolvedChildren
}

async function createElementAsync(elm, props, children) {
  if (typeof elm === 'function') {
    const context = getCurrentContext()
    const r = elm({ ...props, children }, context)
    if (r instanceof Promise) {
      return await r
    }
    return r
  }
  const resolvedChildren = await resolveChildren(children)
  return {
    elm,
    attr: props,
    children: resolvedChildren,
  }
}

function createElement(elm, props = {}, ...children) {
  return createElementAsync(elm, props, children)
}

module.exports = {
  createElement,
  createElementAsync,
  createFragment,
}
