import Proact from '@proact/core'
import Layout from './components/Layout'

export default function (props, context) {
  return (
    <Layout title="Basic Example">
      <section>
        <h1>hello world</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </section>
      <section>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <ul>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
        </ul>
      </section>
    </Layout>
  )
}
