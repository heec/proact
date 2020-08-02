const fs = require('fs')

async function writeJsonFile(filePath, data) {
  return new Promise((resolve, reject) => {
    try {
      const jsonString = JSON.stringify(data, undefined, 2)
      fs.writeFile(filePath, jsonString, 'utf8', function (err, data) {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    } catch (jsonError) {
      return reject(jsonError)
    }
  })
}

module.exports = writeJsonFile
