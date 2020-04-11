import Proact from '@proact/core'

import Layout from './components/Layout'

export default function (props, context) {
  console.log('index context: ', context)
  return (
    <Layout title="Basic Example">
      <h1>hello world</h1>
    </Layout>
  )
}
