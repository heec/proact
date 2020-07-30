const path = require('path')
const express = require('express')
const Bundler = require('parcel-bundler')
const { createProxyMiddleware } = require('http-proxy-middleware')

const PORT = 2345
const API_PORT = 4567

const app = express()

app.use(
  '/admin/api/',
  createProxyMiddleware({
    logLevel: 'debug',
    target: `http://localhost:${API_PORT}/`,
    changeOrigin: true,
  })
)

const entryFiles = [path.join(__dirname, './src/index.html')]
const options = { watch: true, publicUrl: '/admin' }
const bundler = new Bundler('./src/index.html', options)
app.use(bundler.middleware())

app.listen(PORT, () => {
  console.log(`ssg-ui started at http://localhost:${PORT}/`)
})
