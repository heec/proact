const { getCurrentContext } = require('../renderContext')

function createFragment(props) {
  return {
    nodeType: 'FRAGMENT',
    children: props.children,
  }
}

function createTextElement(textString) {
  return {
    nodeType: 'TEXT',
    props: { textString },
  }
}

function createRawHtmlElement(props) {
  const { html, preserveWhitespaces } = props
  const content = preserveWhitespaces
    ? html
    : html.replace(/\s+/g, ' ')
  return {
    nodeType: 'RAW_HTML',
    props: { html: content },
  }
}

function createPromiseElement(promise) {
  return {
    nodeType: 'PROMISE',
    props: { promise },
  }
}

function normalizeArray(arrayItems) {
  let items = []
  for (let i = 0; i < arrayItems.length; i++) {
    let c = arrayItems[i]
    if (Array.isArray(c)) {
      const n = normalizeArray(c)
      items = items.concat(n)
    } else if (c !== undefined) {
      items.push(c)
    } else {
      console.log(`WARNING: normalizeArray item is ${typeof c}`)
    }
  }
  return items
}

function createElement(type, props, ...childArgs) {
  const normalizedChildren = normalizeArray(childArgs)
  let children = undefined

  if (normalizedChildren.length > 0) {
    children = []

    for (let i = 0; i < normalizedChildren.length; i++) {
      let c = normalizedChildren[i]
      if (c !== undefined && c !== null) {
        if (c instanceof Promise) {
          c = createPromiseElement(c)
          children.push(c)
        } else if (typeof c === 'object') {
          children.push(c)
        } else if (typeof c !== 'boolean') {
          c = createTextElement(c)
          children.push(c)
        }
      } else {
        console.log(`WARNING: child node is ${typeof c}`)
      }
    }
  }

  if (typeof type === 'function') {
    const context = getCurrentContext()
    const f = type({ ...props, children }, context)

    if (f instanceof Promise) {
      return createPromiseElement(f)
    }
    return f
  }

  if (type === 'unsavehtml') {
    return createRawHtmlElement(props)
  }

  return {
    nodeType: type,
    props,
    children,
  }
}

module.exports = {
  createElement,
  createFragment,
}
