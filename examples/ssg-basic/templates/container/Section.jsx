import Proact from '@proact/core'

export default function (props, context) {
  const { background, children } = props

  return (
    <section class={background}>
      <div class="container">{children}</div>
    </section>
  )
}
