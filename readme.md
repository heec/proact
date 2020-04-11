# Proact

Express view engine using jsx to render views.

install

```
npm install @proact/core
```

## Basic sample

/views/index.js

```
export default async function (props, context) {
  const data = await getDataAsync()
  return (
    <div>
      <h1>{context.title}</h1>
      <ul>
        {data.map{d => <li>{d}</li>}}
      </ul>
    </div>
  )
}
```

/server.js

```
const express = require('express')
const Proact = require('@proact/core')

const PORT = 3100
const app = express()

Proact.initialize(app, { views: 'views' })

app.get('/', (req, res) => {
  res.render('index', { title: 'Basic Example' })
})

app.listen(PORT, function () {
  console.log(`server running at http://localhost:${PORT}`)
})
```
