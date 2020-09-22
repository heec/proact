const path = require('path')
const fs = require('fs')
const TemplateEngine = require('./TemplateEngine')

async function build(options) {
  const projectDir = (options && options.baseDir) || require.main.path

  const cftText = fs.readFileSync(
    path.join(projectDir, options.configFileName),
    'utf8'
  )

  const _cfg = JSON.parse(cftText)

  ssgConfig = {
    ...options,
    ..._cfg,
    projectDir: projectDir,
    contentDir: '',
  }

  const templateEmgine = new TemplateEngine(ssgConfig)

  console.log('start build')
  const result = await templateEmgine.renderAllPages()
  console.log('build completed')
  return result
}

module.exports = build
