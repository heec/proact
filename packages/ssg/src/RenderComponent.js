const Proact = require('@proact/core')

function RenderComponent(props, context) {
  const { component } = props
  const Component = require(`${context.__proact._viewsDir}/${component.template}`)
    .default

  const children = component.children
    ? component.children.map((child) =>
        RenderComponent({ component: child }, context)
      )
    : []
  return Proact.h(Component, component.props, children)
}

module.exports = RenderComponent
