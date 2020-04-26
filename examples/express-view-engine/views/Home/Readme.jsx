import Proact, { readTextFile } from '@proact/core'
import path from 'path'

import Markdown from '../components/content/Markdown'
import Section from '../components/Section'

export default async function (props, context) {
  const content = await readTextFile(
    path.join(__dirname, '../../../../readme.md')
  )
  return (
    <Section type="content">
      <Markdown content={content} />
    </Section>
  )
}
