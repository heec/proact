function renderChildren(children, output) {
  children.forEach((child) => {
    if (Array.isArray(child)) {
      renderChildren(child, output)
    } else {
      renderNode(child, output)
    }
  })
}

function renderNode(node, output) {
  if (typeof node === 'object') {
    if (node.elm) {
      if (node.elm === 'html') {
        output.push('<!DOCTYPE html>\n')
      }
      output.push(`<${node.elm}`)
      if (node.attr) {
        Object.keys(node.attr).forEach((attr) => {
          output.push(` ${attr}="${node.attr[attr]}"`)
        })
      }
      output.push('>')
    }
    if (node.children) {
      renderChildren(node.children, output)
    }
    if (node.elm) {
      output.push(`</${node.elm}>`)
    }
  } else {
    output.push(node)
  }
}

async function renderToString(component, context) {
  const domTree = await component({}, context)

  const outBuffer = []
  renderNode(domTree, outBuffer)

  return outBuffer.join('')
}

async function renderToStream(component, context, stream) {
  const domTree = await component

  const outBuffer = []
  renderNode(domTree, outBuffer)

  return outBuffer.join('')
}

module.exports = {
  renderToString,
  renderToStream,
}
