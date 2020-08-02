const fs = require('fs')

async function readJsonFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return reject(err)
      }
      try {
        const jsonData = JSON.parse(data)
        resolve(jsonData)
      } catch (jsonError) {
        return reject(jsonError)
      }
    })
  })
}

module.exports = readJsonFile
