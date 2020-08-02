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
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap"
          rel="stylesheet"
        ></link>
        <link href="/styles.css" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  )
}
