import Proact from '@proact/core'

export default function (props, context) {
  const { pageTitle, pageDescription, children } = props

  return (
    <html lang={context.locale}>
      <head>
        <meta charset="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription}></meta>
      </head>
      <body>{children}</body>
    </html>
  )
}
