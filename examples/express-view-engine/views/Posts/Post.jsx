import Proact, { Cache } from '@proact/core'

import path from 'path'

import db from '../../db'
import Section from '../components/Section'
import Paragraph from '../components/content/Paragraph'
import Image from '../components/content/Image'
import Markdown from '../components/content/Markdown'

export default async function (props, context) {
  const { slug } = props
  const post = await db.getPostBySlug(slug)

  return (
    <>
      <Section type="hero">
        <h1>{post.title}</h1>
        <p>{post.abstract}</p>
      </Section>
      <Section type="content">
        {post.body.map((item) => {
          switch (item.component) {
            case 'Paragraph':
              return <Paragraph {...item.props} />
            case 'Image':
              return <Image {...item.props} />
            case 'Markdown':
              return <Markdown {...item.props} />
            default:
              throw new Error(`unknown component: ${item.component}`)
          }
        })}
      </Section>
    </>
  )
}
