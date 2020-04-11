import Proact from '@proact/core'

export default function (props, context) {
  const { title, children } = props
  return <footer>&copy; {new Date().getFullYear()}</footer>
}
