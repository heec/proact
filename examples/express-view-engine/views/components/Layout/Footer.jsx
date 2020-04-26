import Proact from '@proact/core'

export default function (props, context) {
  const { title, children } = props
  return (
    <footer>
      <div class="container">
        <span class="text-muted">
          &copy; {new Date().getFullYear()} by proact
        </span>
      </div>
    </footer>
  )
}
