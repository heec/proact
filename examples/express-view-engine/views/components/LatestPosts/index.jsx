import Proact from '@proact/core'

import db from '../../../db'
import Section from '../Section'

export default async function (props, context) {
  const posts = await db.getLatestPosts()
  return (
    <Section type="latest-posts">
      <h2>Latest Posts</h2>
      <div class="latest-posts">
        {posts.map((post) => (
          <article>
            <h3>{post.title}</h3>
            <p>{post.abstract}</p>
            <a href={`/posts/${post.slug}`}>read more...</a>
          </article>
        ))}
      </div>
      <p>
        <a href="/blog">All posts</a>
      </p>
    </Section>
  )
}
