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

  _createContext(page, locale) {
    const context = {
      locale,
      locales: Object.keys(page.routes),
      routes: page.routes,
      lists: this.config.lists,
    }
    context.content = this._createComponentTree(page.content, locale)

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
    const context = this._createContext(page, locale)
    try {
      const content = await this.renderer.renderToString(RenderPage, context)
      return content
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = TemplateEngine
