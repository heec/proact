const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const ssg = require('../ssg')

const defaultOptions = {
  configFileName: 'proact-ssg.config.json',
  port: 4567,
}

async function cli(args) {
  const uiDir = path.join(args[1], '../../ui')
  const projectDir = process.cwd()
  const options = { ...defaultOptions, contentDir: '', projectDir }

  const cftText = fs.readFileSync(
    path.join(projectDir, options.configFileName),
    'utf8'
  )
  const config = JSON.parse(cftText)
  config.projectDir = projectDir
  config.contentDir = ''

  // console.log(config)

  const app = express()

  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(express.static('assets'))

  const ssgMiddleware = await ssg.createMiddleware(config)
  app.use('/admin/', ssgMiddleware)

  app.get('/admin/*', (req, res, next) => {
    if (req.params[0].endsWith('.js') || req.params[0].endsWith('.map')) {
      if (fs.existsSync(path.join(uiDir, req.params[0]))) {
        return res.sendFile(path.join(uiDir, req.params[0]))
      }
    } else {
      return res.sendFile(path.join(uiDir, 'index.html'))
    }
    next()
  })

  app.listen(options.port, function () {
    console.log(
      `proact ssg admin started at http://localhost:${options.port}/admin/`
    )
  })
}

module.exports = { cli }

// C:\code\playground\mono-repo-sample\examples\ssg-basic\node_modules\@proact\ssg\bin\ui\
// C:\code\playground\mono-repo-sample\examples\ssg-basic\node_modules\@proact\ssg\ui
// C:\code\playground\mono-repo-sample\examples\ssg-basic\node_modules\@proact\ssg\ui\
