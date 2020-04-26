import Proact from '@proact/core'

import db from '../../db'

export default async function (props, context) {
  const posts = await db.getAllPosts()
  return (
    <>
      {posts.map((post) => (
        <article>
          <h3>{post.title}</h3>
          <p>{post.abstract}</p>
          <a href={`/posts/${post.slug}`}>read more...</a>
        </article>
      ))}
    </>
  )
}
