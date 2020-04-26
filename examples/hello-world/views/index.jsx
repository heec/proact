import Proact from '@proact/core'

// fake async data call
const getData = () =>
  new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Hello World')
    }, 500)
  })

const Html = (props, context) => (
  <html>
    <head>
      <title>{context.title}</title>
    </head>
    <body>{props.children}</body>
  </html>
)

export default async (props, context) => {
  const data = await getData()
  return (
    <Html>
      <h1>{data}</h1>
    </Html>
  )
}
