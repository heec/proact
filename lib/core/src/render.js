const { createElementAsync } = require('./vDom')

function getHtmlEncodedString(input) {
  if (input === undefined && input === null) {
    return ''
  }
  return input
    .toString()
    .replace(/\</gi, '&lt;')
    .replace(/\>/gi, '&gt;')
}

function getAttributeSaveString(attribute, value) {
  return value.toString().replace(/\"/gi, "'")
}

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
      if (node.elm === 'unsafe_html') {
        if (node.attr.html) {
          output.push(node.attr.html)
        }
        return
      }
      if (node.elm === 'html') {
        output.push('<!DOCTYPE html>\n')
      }
      output.push(`<${node.elm}`)
      if (node.attr) {
        Object.keys(node.attr).forEach((attr) => {
          output.push(
            ` ${attr}="${getAttributeSaveString(
              attr,
              node.attr[attr]
            )}"`
          )
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
    output.push(getHtmlEncodedString(node))
  }
}

async function renderToString(component) {
  const domTree = await createElementAsync(component, {}, [])

  const outBuffer = []
  renderNode(domTree, outBuffer)

  return outBuffer.join('')
}

// async function renderToStream(component, stream) {
//   const domTree = await createElementAsync(component, {}, [])

//   const outBuffer = []
//   renderNode(domTree, outBuffer)

//   return outBuffer.join('')
// }

module.exports = {
  renderToString,
  // renderToStream,
}
