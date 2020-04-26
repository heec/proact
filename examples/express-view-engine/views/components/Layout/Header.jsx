import Proact from '@proact/core'

export default function (props, context) {
  return (
    <header>
      <div class="container">
        <a href="/" class="logo">
          <h3>Proact Sample</h3>
        </a>
        <nav>
          <a href="/blog">Blog</a>
          <a href="/content-cache">Cache</a>
        </nav>
      </div>
    </header>
  )
}
