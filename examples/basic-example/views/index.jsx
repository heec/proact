import Proact from '@proact/core'
import Layout from './Layout'

export default function (props, context) {
  return (
    <Layout>
      <h1>Hello {context.user.name}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aspernatur quam maxime cum vero, <b>consequatur</b> quaerat
        minima enim sapiente illum excepturi dolores?
      </p>
    </Layout>
  )
}
