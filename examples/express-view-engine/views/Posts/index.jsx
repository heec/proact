import Proact, { Cache } from '@proact/core'

import Layout from '../components/Layout'
import LatestPosts from '../components/LatestPosts'
import Post from './Post'

export default function (props, context) {
  const { slug } = context
  return (
    <Layout>
      <Cache
        key={`post-${slug}`}
        maxAge={360}
        content={() => <Post slug={slug} />}
      />
      <Cache
        key={`post-${slug}-relatedposts`}
        maxAge={60}
        content={() => <LatestPosts />}
      />
    </Layout>
  )
}
