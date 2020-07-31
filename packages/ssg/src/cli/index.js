const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const createMiddleware = require('../createMiddleware')

const defaultOptions = {
  configFileName: 'proact-ssg.config.json',
  baseDir: process.cwd(),
  assetsDir: 'assets',
  outDir: 'dist',
  port: 4567,
}

async function cli(args) {
  const app = express()

  const options = { ...defaultOptions }

  app.use(bodyParser.json({ limit: '1mb' }))

  await createMiddleware(app, options)

  app.listen(options.port, function () {
    console.log(
      `proact ssg admin started at http://localhost:${options.port}/admin/`
    )
  })
}

module.exports = { cli }
