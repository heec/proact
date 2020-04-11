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
