const fs = require('fs')
const path = require('path')

// dummy db

function readPosts() {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, 'posts.json'), 'utf8', function (
      err,
      fileContent
    ) {
      if (err) {
        return reject(err)
      }
      const data = JSON.parse(fileContent)
      setTimeout(function () {
        resolve(data)
      }, 30)
    })
  })
}

async function getPostBySlug(slug) {
  const start = new Date()
  const posts = await readPosts()
  const post = posts.find((p) => p.slug === slug)
  const end = new Date()
  console.log(`getPostBySlug: ${end - start}ms`)
  return post
}

async function getLatestPosts() {
  const start = new Date()
  const posts = await readPosts()
  const post = posts.slice(0, 3)
  const end = new Date()
  console.log(`getLatestPosts: ${end - start}ms`)
  return post
}

async function getAllPosts() {
  const start = new Date()
  const posts = await readPosts()
  const end = new Date()
  console.log(`getAllPosts: ${end - start}ms`)
  return posts
}

module.exports = {
  getPostBySlug,
  getLatestPosts,
  getAllPosts,
}
