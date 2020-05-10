# @Proact/core

Proact is an template engine for node js which renders React like jsx functional components to static HTML or XML.

### Features

- Optimized for fast server rendering
- Supports async rendered views
- Output caching
- Built-in express view engine

### install

```
npm install @proact/core
```

## Basic usage

Rendering HTML

```
// templates/Paragraph.jsx
import Proact from '@proact/core'

export default (props, context) => (
  <p>{context.body}</p>
)

```

```
// index.js
const Proact = require('@proact/core')

const renderer = Proact.createRenderer({ views: 'templates' })

renderer
  .renderToString('Paragraph.jsx', { body: 'lorem ipsum' })
  .then(function (html) {
    console.log(html)
  })

```

Rendering XML

```
// templates/data.jsx
import Proact from '@proact/core'

export default async (props, context) => {
  return (
    <data
      xmlns="http://www.myorg.org/schemas/data/0.9"
      m:xmlns="http://www.myorg.org/schemas/meta/0.9"
    >
      <title>{context.title}</title>
      <m:category>{context.category}</m:category>
    </data>
  )
}
```

```
// index.js
const Proact = require('@proact/core')

// set docType to xml
const renderer = Proact.createRenderer({
  views: 'templates',
  docType: 'xml',
})

renderer
  .renderToString('data.jsx', {
    title: 'lorem ipsum',
    category: 'dolor',
  })
  .then(function (xml) {
    console.log(xml)
  })

```

### Built-in express view engine

```
// server.js
const express = require('express')
const Proact = require('@proact/core')

const PORT = 3100
const app = express()

Proact.initializeViewEngine(app, { views: 'views' })

app.get('/', (req, res) => {
  const context = { title: 'Basic Example' }
  res.render('index', context)
})

app.listen(PORT, function () {
  console.log(`server running at http://localhost:${PORT}`)
})
```

### JSX Views

Proact supports only functional components. The component gets two parameters: `props` and `context`.

```
import Proact from '@proact/core'

export default (props, context) => (
  <div>{context.user.email}</div>
)
```

Components can also be async.

```
import Proact from '@proact/core'

export default async function (props, context) {
  const data = await getSomeDataAsync()
  return (
    <ul>
      {data.map(item => <li>{item}</li>)}
    </ul>
  )
}
```

Insert HTML content

```
import Proact, { UnsafeHtml } from '@proact/core'

export default (props) => {
  const { name } = props
  return (
    <UnsafeHtml html={`<h1>Hello ${name}</h1>`} />
  )
}
```

Use content cache

```
import Proact, { Cache } from '@proact/core'

const getItems = function (numberOfItems) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array(numberOfItems)
          .fill()
          .map(() => 'Lorem ipsum dolor sit amet')
      )
    }, 500)
  })
}

const List = async (props) => {
  const items = await getItems(props.numberOfItems)
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

const CachedList = () => {
  return (
    <Cache
      key={`large-list`}
      // maxAge duration in seconds
      maxAge={60}
      content={() => <List numberOfItems={1000} />}
    />
  )
}

```

Short example

```
import Proact, { Cache, UnsafeHtml } from '@proact/core'
import MarkdownIt from 'markdown-it'
import db from '../db'

const markdown = new MarkdownIt()

const Post = async (props) => {
  const { slug } = props
  const post = await db.getPostBySlug(slug)
  const content = markdown.render(post.content)
  return (
    <section>
      <h1>{post.title}<h1>
      <h1>{post.abstract}<h1>
      <UnsafeHtml html={content} preserveWhitespaces />
    </section>
  )
}

const RelatedPosts = async (props) => {
  const { slug } = props
  const posts = await db.getRelatedPosts(slug)
  return posts.map(item => (
    <article>
      <h3>{item.title}</h3>
      <p>{item.abstract}</p>
      <a href={`/blog/${slog}`}>read more...</a>
    </article>
  )
}

const BlogPost (props, context) {
  const { slug } = context
  return (
    <>
      <Cache
        key={`post_${slug}`}\
        maxAge={360}
        content={() => (
          <Post slug={slug} />
        )}
      />
      <Cache
        key={`relatedposts_${slug}`}
        maxAge={60}
        content={() => (
          <RelatedPosts slug={slug} />
        )}
      />
    </>
  )
}
```
