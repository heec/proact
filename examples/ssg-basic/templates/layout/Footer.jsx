import Proact from '@proact/core'

export default function (props, context) {
  const {} = props

  return (
    <footer class="footer">
      <div class="container">&copy; {new Date().getFullYear()} proact</div>
    </footer>
  )
}
