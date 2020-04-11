const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function createFragment(props) {
  return props
}

function createElement(elm, props = {}, ...children) {
  async function createElementAsync(a, b, c) {
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
    if (typeof elm === 'function') {
      const r = elm({ ...props, children }, {})
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
  return createElementAsync(elm, props, children)
}

module.exports = {
  createElement,
  createFragment,
}
