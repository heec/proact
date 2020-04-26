import Proact, { UnsafeHtml } from '@proact/core'
import MarkdownIt from 'markdown-it'

export default function (props, context) {
  const { content } = props
  const md = new MarkdownIt()
  const markdown = md.render(content)
  return <UnsafeHtml html={markdown} preserveWhitespaces />
}
