import Proact from '@proact/core'

const Html = (props, context) => (
  <html>
    <head>
      <title>{context.metaData.title}</title>
    </head>
    <body>{props.children}</body>
  </html>
)

export default async (props, context) => {
  return (
    <Html>
      <h1>{context.content.title}</h1>
      <p>{context.content.body}</p>
    </Html>
  )
}
