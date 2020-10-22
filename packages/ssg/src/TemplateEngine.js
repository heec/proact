const path = require('path')
const fs = require('fs')
const Proact = require('@proact/core')
const RenderPage = require('./RenderPage')
const readJsonFile = require('./utils/readJsonFile')
const asyncForEach = require('./utils/asyncForEach')

class SsgContext {
  constructor(config, locale) {
    this.config = config
    this.locale = locale
    this._listCache = {}
    this._pageCollectionCache = {}
  }

  async getList(listName) {
    if (!this.config.lists.hasOwnProperty(listName)) {
      throw new Error(`unknown list ${listName}`)
    }

    if (!this._listCache.hasOwnProperty(listName)) {
      const list = await readJsonFile(
        path.join(
          this.config.projectDir,
          this.config.dataListDir,
          `${listName}.json`
        )
      )
      const listProps = this.config.lists[listName].props
      const items = []
      list.forEach((item) => {
        const newItem = {}
        Object.keys(listProps).forEach((propName) => {
          const loc = listProps[propName].localize ? this.locale : '*'
          newItem[propName] = item[propName][loc]
        })
        newItem.id = item.id
        items.push(newItem)
      })

      this._listCache[listName] = items
    }

    return this._listCache[listName]
  }

  async getListItem(listName, id) {
    const list = await this.getList(listName)
    return list.find((item) => item.id === id)
  }

  async getPageCollection(pageCollectionName) {
    if (!this.config.pages.hasOwnProperty(pageCollectionName)) {
      throw new Error(`unknown page collection ${pageCollectionName}`)
    }

    if (!this._pageCollectionCache.hasOwnProperty(pageCollectionName)) {
      const dirPath = path.join(
        this.config.projectDir,
        this.config.pageCollectionDir,
        pageCollectionName
      )
      const files = fs.readdirSync(dirPath)
      const items = []
      await asyncForEach(files, async (file) => {
        const pageData = await readJsonFile(path.join(dirPath, file))
        delete pageData.content
        pageData.fileName = file

        const pageProps = this.config.pages[pageCollectionName].props
        const newProps = {}
        Object.keys(pageProps).forEach((propName) => {
          const loc = pageProps[propName].localize ? this.locale : '*'
          newProps[propName] = pageData.props[propName][loc]
        })
        pageData.props = newProps

        items.push(pageData)
      })

      this._pageCollectionCache[pageCollectionName] = items
    }

    return this._pageCollectionCache[pageCollectionName]
  }

  async getPage(pageCollectionName, fileName) {
    const pageCollection = await this.getPageCollection(pageCollectionName)
    return pageCollection.find((item) => item.fileName === fileName)
  }
}

class TemplateEngine {
  constructor(config) {
    this.templateDir = path.join(config.projectDir, config.templateDir)
    this.contentDir = path.join(config.projectDir, config.contentDir)
    this.outDir = path.join(config.projectDir, config.outDir)
    this.projectDir = config.projectDir
    this.config = config
    this.defaultLocale = config.defaultLocale || 'en'
    this.renderer = Proact.createRenderer({ views: this.templateDir })
  }

  _createComponentTree(pageContent, locale) {
    const _self = this
    function createComponent(component, locale) {
      const componentsDef = _self.config.components[component.componentId]
      const propsDef = componentsDef.props
      const _component = {
        template: componentsDef.template,
        props: {},
      }
      Object.keys(component.props).forEach((propName) => {
        const loc = propsDef[propName].localize ? locale : '*'
        _component.props[propName] = component.props[propName][loc]
      })
      if (component.children) {
        _component.children = component.children.map((c) =>
          createComponent(c, locale)
        )
      }
      return _component
    }

    return createComponent(pageContent, locale)
  }

  async _createContext(collection, page, locale) {
    const context = {
      locale,
      locales: Object.keys(page.routes),
      routes: page.routes,
      projectDir: this.projectDir,
      templateDir: this.templateDir,
      outDir: this.outDir,
    }

    context.page = {
      name: page.name,
      fileName: page.fileName,
      dateCreated: page.dateCreated,
      dateLastModified: page.dateLastModified,
      props: {},
    }

    const pageProps = this.config.pages[collection].props
    Object.keys(page.props).forEach((propName) => {
      const loc = pageProps[propName].localize ? locale : '*'
      context.page.props[propName] = page.props[propName][loc]
    })

    context.content = this._createComponentTree(page.content, locale)

    context.ssg = new SsgContext(this.config, locale)

    if (this.config.siteData) {
      context.siteData = { ...this.config.siteData }
    }

    if (this.config.onCreateContext) {
      this.config.onCreateContext(this.config, context)
    }
    return context
  }

  _savePageContent(route, content) {
    let fileName = path.join(this.outDir, route)

    if (fileName.endsWith(path.sep)) {
      fileName += 'index.html'
    }

    const dirName = path.dirname(fileName)

    fs.mkdirSync(path.dirname(fileName), { recursive: true })
    fs.writeFileSync(fileName, content, 'utf8')
  }

  async renderContent(collection, page, locale) {
    const context = await this._createContext(collection, page, locale)
    try {
      let content = await this.renderer.renderToString(RenderPage, context)
      content = content.replace(/>\s+</g, '><')

      if (this.config.postProcessor) {
        const postProcessingRes = this.config.postProcessor(content, context)
        if (postProcessingRes instanceof Promise) {
          content = await postProcessingRes
        } else {
          content = postProcessingRes
        }
      }

      return content
    } catch (err) {
      console.log(err)
    }
  }

  async renderPage(collection, fileName) {
    const page = await readJsonFile(
      path.join(
        this.projectDir,
        this.config.pageCollectionDir,
        collection,
        fileName
      )
    )

    const locales = Object.keys(page.routes)
    await asyncForEach(locales, async (locale) => {
      const content = await this.renderContent(collection, page, locale)
      this._savePageContent(page.routes[locale], content)
    })
  }

  async renderAllPages(buildOptions) {
    const options = { ...buildOptions }

    const pageCollections = Object.keys(this.config.pages)
    const buildResult = {
      totalFiles: 0,
      totalFilesBuild: 0,
      totalFilesFailed: 0,
      errors: [],
      details: [],
    }

    const projectDir = this.projectDir
    const pageCollectionDir = this.config.pageCollectionDir

    await asyncForEach(pageCollections, async (pageCollection) => {
      // get directory content

      const collectionDir = path.join(
        projectDir,
        pageCollectionDir,
        pageCollection
      )
      const files = fs.readdirSync(collectionDir)

      await asyncForEach(files, async (file) => {
        const page = await readJsonFile(path.join(collectionDir, file))
        const locales = Object.keys(page.routes)
        const pageRes = {
          name: page.name,
          fileName: page.fileName,
          pageCollection: pageCollection,
          dateCreated: page.dateCreated,
          dateLastModified: page.dateLastModified,
          routes: [],
        }

        await asyncForEach(locales, async (locale) => {
          const route = page.routes[locale]
          const res = {
            route,
          }
          buildResult.totalFiles += 1

          try {
            const content = await this.renderContent(
              pageCollection,
              page,
              locale
            )
            this._savePageContent(route, content)
            res.status = 'ok'
            buildResult.totalFilesBuild += 1
            console.log(`build ${route} - OK`)
          } catch (err) {
            console.log(`build ${route} - FAILED`)
            console.log(err)
            res.status = 'failed'
            res.error = err.toString()
            buildResult.totalFilesFailed += 1
            buildResult.errors.push({
              name: page.name,
              fileName: page.fileName,
              pageCollection,
              locale,
              error: err.name,
              message: err.message,
              stack: err.stack,
            })
            const e = new Error()
          }
          pageRes.routes.push(res)
        })

        buildResult.details.push(pageRes)
      })
    })
    return buildResult
  }

  //async renderPageCollection(collection, fileName) {}
}

module.exports = TemplateEngine
