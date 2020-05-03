const fs = require('fs')

function readTextFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, fileContent) {
      if (err) {
        return reject(err)
      }
      resolve(fileContent)
    })
  })
}

function readJsonFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, fileContent) {
      if (err) {
        return reject(err)
      }
      const data = JSON.parse(fileContent)
      resolve(data)
    })
  })
}

module.exports = {
  readTextFile,
  readJsonFile,
}
