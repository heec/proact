import Proact from '@proact/core'

export default function (props, context) {
  const { type, children } = props
  return (
    <section class={type}>
      <div class="container">{children}</div>
    </section>
  )
}
