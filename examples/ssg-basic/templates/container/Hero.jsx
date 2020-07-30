import Proact from '@proact/core'

export default function (props, context) {
  const { title, leadText } = props

  return (
    <section>
      <h1>{title}</h1>
      <h2>{leadText}</h2>
    </section>
  )
}
