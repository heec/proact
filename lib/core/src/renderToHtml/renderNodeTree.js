const asyncForEach = require('../utils/asyncForEach')
const { createStringBuffer } = require('../utils/stringBuffer')
const { contentCache } = require('../components/Cache')

function getHtmlEncodedString(input) {
  if (input === undefined || input === null) {
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

async function renderChildren(children, output) {
  await asyncForEach(children, async (n) => {
    if (Array.isArray(n)) {
      await renderChildren(n, output)
    } else {
      await renderNode(n, output)
    }
  })
}

async function renderNode(node, output) {
  if (node.nodeType === 'FRAGMENT') {
    await renderChildren(node.children, output)
  } else if (node.nodeType === 'PROMISE') {
    const n = await node.props.promise
    await renderNode(n, output)
  } else if (node.nodeType === 'TEXT') {
    const htmlEncodedText = getHtmlEncodedString(
      node.props.textString
    )
    output.write(htmlEncodedText)
  } else if (node.nodeType === 'RAW_HTML') {
    output.write(node.props.html)
  } else if (node.nodeType === 'chache_add') {
    const cacheBuffer = createStringBuffer()
    await renderChildren(node.children, cacheBuffer)
    const cacheItem = cacheBuffer.toString()
    const cacheOptions = {}
    if (node.props._max_age) {
      cacheOptions.maxAge = node.props._max_age
    }
    contentCache.add(node.props._key, cacheItem, cacheOptions)
    output.write(cacheItem)
  } else {
    if (node.nodeType === 'html') {
      output.write('<!DOCTYPE html>\n')
    }
    output.write(`<${node.nodeType}`)
    if (node.props) {
      Object.keys(node.props).forEach((attr) => {
        if (
          node.props[attr] !== undefined &&
          node.props[attr] !== null
        ) {
          output.write(
            ` ${attr}="${getAttributeSaveString(
              attr,
              node.props[attr]
            )}"`
          )
        }
      })
    }
    if (node.children) {
      output.write(`>`)
      await renderChildren(node.children, output)
      output.write(`</${node.nodeType}>`)
    } else {
      output.write(` />`)
    }
  }
}

module.exports = {
  renderNode,
}
