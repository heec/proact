import Proact from '@proact/core'

import Html from './Html'
import Header from './Header'
import Footer from './Footer'
import Hero from '../container/Hero'

export default function (props, context) {
  const {
    title,
    abstract,
    author,
    backgroundImage,
    fontColor,
    pageTitle,
    pageDescription,
    children,
  } = props

  return (
    <Html pageTitle={pageTitle} pageDescription={pageDescription}>
      <Header />
      <main>
        <Hero
          title={title}
          leadText={abstract}
          backgroundImage={backgroundImage}
          fontColor={fontColor}
        />
        {children}
      </main>
      <section class="bg-grey-light">
        <div class="container">
          <h3>related plog posts</h3>
        </div>
      </section>
      <Footer />
    </Html>
  )
}
