import Proact from '@proact/core'

export default function (props, context) {
  return (
    <header>
      <h3>App Title</h3>
      <span>{context.user.email}</span>
    </header>
  )
}
