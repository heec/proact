const express = require('express')
const bodyParser = require('body-parser')
const Proact = require('@proact/core')
const routes = require('./routes')

const PORT = 3100
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/', routes)

Proact.initializeViewEngine(app, { views: 'views' })

app.listen(PORT, function () {
  console.log(`server running at http://localhost:${PORT}`)
})
