const ssg = require('@proact/ssg')

async function build() {
  const options = {
    configFileName: 'proact-ssg.config.json',
    baseDir: process.cwd(),
    assetsDir: 'assets',
    outDir: 'dist',
  }

  console.log('*** start build ***')
  console.log(ssg.build)
  const result = await ssg.build(options)
}

build()
