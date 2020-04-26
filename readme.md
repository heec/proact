# proact

Proact is an Express view engine which renders jsx functional components on server to static markup.

### Features

- Support for async rendered views
- Optimized for fast server rendering
- Output caching

### install

```
npm install @proact/core
```

## Basic usage

### Use as express view engine

/server.js

```
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
