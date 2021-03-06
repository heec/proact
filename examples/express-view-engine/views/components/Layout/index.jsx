import Proact from '@proact/core'

import Html from './Html'
import Header from './Header'
import Footer from './Footer'

export default function (props, context) {
  const { children } = props
  return (
    <Html>
      <Header />
      <main>{children}</main>
      <Footer />
    </Html>
  )
}
