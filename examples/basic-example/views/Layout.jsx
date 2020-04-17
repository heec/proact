import Proact from '@proact/core'

import Header from './Header'
import Footer from './Footer'

export default function (props, context) {
  const { children } = props
  return (
    <html>
      <head>
        <style>
          <unsafe_html
            html={`
              body {
                margin: 0;
                padding: 0;
                font-family: sans-serif;
                color: #333;
              }
              header, footer {
                padding: 0.5rem 1rem;
                background-color: #eee;
              }
              header {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              main {
                padding: 1.5rem 1rem;
              }
            `}
          />
        </style>
        <title>{context.title}</title>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
