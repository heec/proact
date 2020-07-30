import Proact from '@proact/core'

export default function (props, context) {
  const {} = props

  return <footer>&copy; {new Date().getFullYear()} proact</footer>
}
