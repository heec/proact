const Proact = require('@proact/core')
const RenderComponent = require('./RenderComponent')

function RenderPage(props, context) {
  return RenderComponent({ component: context.content }, context)
}

module.exports = RenderPage
