const path = require('path')
const fs = require('fs')
const Proact = require('@proact/core')
const RenderPage = require('./RenderPage')
const readJsonFile = require('./utils/readJsonFile')
const asyncForEach = require('./utils/asyncForEach')

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

  async _createContext(page, locale) {
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
    }
    context.content = this._createComponentTree(page.content, locale)
    context.lists = {}

    await asyncForEach(Object.keys(this.config.lists), async (listName) => {
      context.lists[listName] = await readJsonFile(
        path.join(this.config.projectDir, 'lists', `${listName}.json`)
      )
    })

    if (this.config.siteData) {
      context.siteData = { ...this.config.siteData }
    }

    if (this.config.onCreateContext) {
      let pageData = this.config.onCreateContext(this.config)
      if (pageData instanceof Promise) {
        pageData = await pageData
      }
      context.pageData = pageData
    }
    return context
  }

  async renderPage(collection, fileName) {
    const page = await readJsonFile(
      path.join(this.projectDir, 'pages', collection, fileName)
    )

    const locales = Object.keys(page.routes)
    await asyncForEach(locales, async (locale) => {
      let content = await this.renderContent(page, locale)
      content = content.replace(/>\s+</g, '><')
      let fileName = path.join(this.outDir, page.routes[locale])

      if (fileName.endsWith(path.sep)) {
        fileName += 'index.html'
      }

      const dirName = path.dirname(fileName)

      fs.mkdirSync(path.dirname(fileName), { recursive: true })
      fs.writeFileSync(fileName, content, 'utf8')
    })
  }

  async renderContent(page, locale) {
    const context = await this._createContext(page, locale)
    try {
      const content = await this.renderer.renderToString(RenderPage, context)
      return content
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = TemplateEngine
