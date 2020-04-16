import Proact from '@proact/core'
import { createStyles, registerInlineStyles } from '@proact/styles'
import Layout from './components/Layout'

const theme = {
  colors: {
    text: '#222',
    primary: 'lime',
  },
  spacing: (m) => `${m * 8}px`,
}

const styles = createStyles({
  hero: {
    userSelect: 'none',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
  },
  content: {
    color: theme.colors.text,
    padding: theme.spacing(4),
    ':hover': {
      color: 'lime',
    },
  },
})

export default function (props, context) {
  const classes = registerInlineStyles(styles)
  return (
    <Layout title="Basic Example">
      <section class={classes.hero}>
        <h1>hello world</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </section>
      <section class={classes.content}>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <ul>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
          <li>Lorem ipsum dolor sit.</li>
        </ul>
      </section>
    </Layout>
  )
}
