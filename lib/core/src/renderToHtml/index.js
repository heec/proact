const { createVNodeTree } = require('../nodeTree/createVNodeTree')
const { renderNode } = require('./renderNodeTree')
const { createStringBuffer } = require('../utils/stringBuffer')

async function renderNodeTreeToString(Component) {
  const stringBuffer = createStringBuffer()
  await renderNodeTreeToStream(Component, stringBuffer)
  const result = stringBuffer.toString()
  return result
}

async function renderNodeTreeToStream(Component, stream) {
  const start = new Date().getTime()
  const nodeTree = createVNodeTree(Component)
  await renderNode(nodeTree, stream)
  const end = new Date().getTime()
  stream.write(`<!-- render time: ${end - start}ms -->`)
  // stream.end()
}

module.exports = {
  renderNodeTreeToString,
  renderNodeTreeToStream,
}
