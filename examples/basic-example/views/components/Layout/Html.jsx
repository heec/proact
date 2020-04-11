import Proact from '@proact/core'

export default function (props, context) {
  const { title, children } = props
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
