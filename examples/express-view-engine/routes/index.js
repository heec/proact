const express = require('express')
const { contentCache } = require('@proact/core')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('Home/index', {
    title: 'Home',
  })
})

router.get('/blog', (req, res) => {
  res.render('Blog/index', {
    title: 'Blog',
  })
})

router.get('/posts/:slug', (req, res) => {
  res.render('Posts/index', {
    slug: req.params.slug,
    title: req.params.slug,
  })
})

router.get('/content-cache', (req, res) => {
  res.render('ContentCache/index', {
    title: 'Chache control',
  })
})

router.post('/clear-cache', (req, res) => {
  contentCache.clearAll()
  res.redirect('/content-cache')
})

router.get('/*', (req, res) => {
  res.status(404).render('404/index', {
    title: 'Page not found',
  })
})

module.exports = router
