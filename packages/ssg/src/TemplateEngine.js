const path = require('path')
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

  async renderPage(page) {
    try {
      const content = await this.renderer.renderToString(
        RenderPage,
        pageContent
      )
      return content
    } catch (err) {
      console.log(err)
    }
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
