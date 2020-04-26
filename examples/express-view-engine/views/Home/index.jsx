import Proact from '@proact/core'

import Layout from '../components/Layout'
import Section from '../components/Section'
import LatestPosts from '../components/LatestPosts'
import Readme from './Readme'

export default function (props, context) {
  return (
    <Layout>
      <Section type="hero">
        <h1>Proact express view engine sample</h1>
        <p>
          Aspernatur quam maxime cum vero, quaerat minima enim
          sapiente illum excepturi dolores?
        </p>
      </Section>
      <Readme />
      <LatestPosts />
    </Layout>
  )
}
