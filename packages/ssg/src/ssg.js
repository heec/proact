const express = require('express')
const SsgAdminService = require('./SsgAdminService')
const TemplateEngine = require('./TemplateEngine')

function routeHandler(fn) {
  return async function (req, res, next) {
    function ok(data) {
      res.json(data)
    }
    function failed(statusCode, message) {
      console.log('********* ERROR ************')
      console.log(message)
      res.status(statusCode).json({ error: message })
    }
    try {
      await fn(req, ok, failed)
    } catch (error) {
      failed(500, error)
    }
  }
}

async function createMiddleware(ssgConfig) {
  const router = express.Router()
  const adminService = new SsgAdminService(ssgConfig)
  const templateEngine = new TemplateEngine(ssgConfig)

  router.route('/api/configuration').get(
    routeHandler(async (req, ok, failed) => {
      console.log(`-> /admin/api/configuration`)
      const config = await adminService.getConfiguration()
      ok(config)
    })
  )

  router
    .route('/api/dataList/:listName')
    .get(
      routeHandler(async (req, ok, failed) => {
        const { listName } = req.params
        const list = await adminService.getListItems(listName)
        ok(list)
      })
    )
    .post(
      routeHandler(async (req, ok, failed) => {
        const { listName } = req.params
        const list = await adminService.addListItem(listName, req.body)
        ok(list)
      })
    )

  router
    .route('/api/dataList/:listName/:id')
    .put(
      routeHandler(async (req, ok, failed) => {
        const { listName, id } = req.params
        const list = await adminService.updateListItem(listName, id, req.body)
        ok(list)
      })
    )
    .delete(
      routeHandler(async (req, ok, failed) => {
        const { listName, id } = req.params
        const list = await adminService.deleteListItem(listName, id)
        ok(list)
      })
    )

  router
    .route('/api/pages/:collection')
    .get(
      routeHandler(async (req, ok, failed) => {
        const { collection } = req.params
        const pageCollection = await adminService.getPageCollection(collection)
        ok(pageCollection)
      })
    )
    .post(
      routeHandler(async (req, ok, failed) => {
        const { collection } = req.params
        await adminService.createPage(collection, req.body)
        const pageCollection = await adminService.getPageCollection(collection)
        ok(pageCollection)
      })
    )

  router
    .route('/api/pages/:collection/:fileName')
    .get(
      routeHandler(async (req, ok, failed) => {
        const { collection, fileName } = req.params
        const pageCollection = await adminService.getPage(collection, fileName)
        ok(pageCollection)
      })
    )
    .put(
      routeHandler(async (req, ok, failed) => {
        const { collection, fileName } = req.params
        await adminService.updatePage(collection, fileName, req.body)

        const pageCollection = await adminService.getPageCollection(collection)
        ok(pageCollection)
      })
    )
    .patch(
      routeHandler(async (req, ok, failed) => {
        const { collection, fileName } = req.params
        await adminService.updatePageContent(collection, fileName, req.body)
        ok({})
      })
    )
    .delete(
      routeHandler(async (req, ok, failed) => {
        const { collection, fileName } = req.params
        await adminService.deletePage(collection, fileName)
        const pageCollection = await adminService.getPageCollection(collection)
        ok(pageCollection)
      })
    )

  router.route('/api/rendercontent').post(
    routeHandler(async (req, ok, failed) => {
      const { pageContent, locale } = req.body
      const html = await templateEngine.renderContent(pageContent, locale)
      ok({ html })
    })
  )

  router
    .route('/api/assets/:path*')
    .get(
      routeHandler(async (req, ok, failed) => {
        const { path } = req.params
        ok({})
      })
    )
    .post(
      routeHandler(async (req, ok, failed) => {
        const { path } = req.params
        ok({})
      })
    )
    .put(
      routeHandler(async (req, ok, failed) => {
        const { path } = req.params
        ok({})
      })
    )
    .delete(
      routeHandler(async (req, ok, failed) => {
        const { path } = req.params
        ok({})
      })
    )

  return router
}

module.exports = {
  createMiddleware,
}
