const sh = require('shelljs')

sh.rm('-rf', '.cache')
sh.rm('-rf', 'dist')
sh.exec('npm run build')

sh.rm('-rf', '../ssg/ui/*')
sh.cp('-R', 'dist/*', '../ssg/ui/')
