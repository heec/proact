const express = require('express')
const bodyParser = require('body-parser')
const ssgMiddleware = require('@proact/ssg')

const defaultOptions = {
  configFileName: 'proact-ssg.config.json',
  baseDir: process.cwd(),
  assetsDir: 'assets',
  outDir: 'dist',
  port: 4567,
}

async function start() {
  const app = express()

  const options = {
    ...defaultOptions,
  }

  app.use(bodyParser.json({ limit: '5mb' }))

  await ssgMiddleware(app, options)

  app.listen(options.port, function () {
    console.log(
      `proact ssg admin started at http://localhost:${options.port}/admin/`
    )
  })
}

start()
