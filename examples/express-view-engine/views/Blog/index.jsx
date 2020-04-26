import Proact, { Cache } from '@proact/core'

import Layout from '../components/Layout'
import Section from '../components/Section'
import PostList from './PostList'

export default function (props, context) {
  return (
    <Layout>
      <Cache key="blog-page" maxAge={60}>
        <Section type="hero">
          <h1>Blog</h1>
          <p>
            Aspernatur quam maxime cum vero, <b>consequatur</b>{' '}
            quaerat minima enim sapiente illum excepturi dolores?
          </p>
        </Section>
        <Section type="content">
          <h2>Latest Posts</h2>
          <PostList />
        </Section>
      </Cache>
    </Layout>
  )
}
