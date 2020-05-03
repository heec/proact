import Proact, { Cache } from '@proact/core'

import GlobalStyles from './GlobalStyles'

export default function (props, context) {
  const { children } = props
  return (
    <html>
      <head>
        <Cache
          key="common-html-header"
          content={() => (
            <>
              <meta charset="UTF-8"></meta>
              <meta
                name="viewport"
                content="width=device-width, shrink-to-fit=no, initial-scale=1, maximum-scale=1, user-scalable=0"
              ></meta>
              <link rel="shortcut icon" href="/favicon.ico"></link>
              <GlobalStyles />
            </>
          )}
        />
        <title>{context.title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
