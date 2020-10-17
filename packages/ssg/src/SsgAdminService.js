const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const asyncForEach = require('./utils/asyncForEach')
const readJsonFile = require('./utils/readJsonFile')
const writeJsonFile = require('./utils/writeJsonFile')

class SsgAdminService {
  constructor(config) {
    this.basePath = path.join(config.projectDir, config.contentDir)
    this.config = config

    // todo: validate directories and configuration

    // update config changes
    this.updateConfigChanges()
  }

  _getDefaultPropValue(def) {
    if (def.defaultValue) {
      return def.defaultValue
    }

    switch (def.type) {
      case 'int':
      case 'float':
        return 0
      case 'boolean':
        return false
      case 'string':
      case 'text':
      case 'markdown':
      case 'asset':
      case 'select':
        return ''
      case 'listRef':
      case 'pageRef':
        return def.multiple ? [] : ''
      default:
        return ''
    }
  }

  _createProps(propsDefinition, locales) {
    const item = {}
    Object.keys(propsDefinition).forEach((key) => {
      const property = propsDefinition[key]
      const value = {}
      if (property.localize) {
        locales.forEach((locale) => {
          value[locale] = this._getDefaultPropValue(property)
        })
      } else {
        value['*'] = this._getDefaultPropValue(property)
      }
      item[key] = value
    })
    return item
  }

  _createPageContentFromTemplate(template, locales) {
    const createComponent = (componentTemplate) => {
      const { componentId, children } = componentTemplate
      const componentDefinition = this.config.components[componentId]
      const component = {
        id: uuid(),
        componentId,
        props: this._createProps(componentDefinition.props, locales),
      }
      if (componentDefinition.children) {
        component.children = []
      }
      if (children) {
        component.children = children.map((c) => createComponent(c))
      }
      return component
    }

    const content = createComponent(template)
    return content
  }

  _updatePageProps(props, propsDefinition, locales) {
    const updatedProps = {}

    Object.keys(propsDefinition).forEach((key) => {
      const prop = props[key]
      if (propsDefinition[key].localize) {
        // add locales
        locales.forEach((locale) => {
          if (prop[locale] === undefined) {
            prop[locale] = this._getDefaultPropValue(propsDefinition[key])
          }
        })
        // delete locales
        Object.keys(prop).forEach((locale) => {
          if (!locales.includes(locale)) {
            delete prop[locale]
          }
        })
      }
      updatedProps[key] = prop
    })
    return updatedProps
  }

  _updatePageContent(content, locales) {
    const updateNode = (node) => {
      const { componentId, children } = node
      const componentDefinition = this.config.components[componentId]
      const propsDefinition = componentDefinition.props
      if (!node.id) {
        node.id = uuid()
      }
      Object.keys(propsDefinition).forEach((key) => {
        if (propsDefinition[key].localize) {
          const prop = node.props[key]
          // add locales
          locales.forEach((locale) => {
            if (prop[locale] === undefined) {
              prop[locale] = this._getDefaultPropValue(propsDefinition[key])
            }
          })
          // delete locales
          Object.keys(prop).forEach((locale) => {
            if (!locales.includes(locale)) {
              delete prop[locale]
            }
          })
        }
      })

      if (children) {
        children.forEach((c) => updateNode(c))
      }

      return node
    }
    const updatedContent = updateNode(content)
    return updatedContent
  }

  _updatePropsChanges(props, propsConfig, locales) {
    const newProps = {}
    Object.keys(propsConfig).forEach((propName) => {
      const propConfig = propsConfig[propName]
      const { localize } = propConfig
      newProps[propName] = {}
      if (props[propName]) {
        if (localize) {
          locales.forEach((loc) => {
            newProps[propName][loc] =
              props[propName][loc] || this._getDefaultPropValue(propConfig)
          })
        } else {
          newProps[propName]['*'] =
            props[propName]['*'] || this._getDefaultPropValue(propConfig)
        }
      } else {
        if (localize) {
          locales.forEach((loc) => {
            newProps[propName][loc] = this._getDefaultPropValue(propConfig)
          })
        } else {
          newProps[propName]['*'] = this._getDefaultPropValue(propConfig)
        }
      }
    })
    return newProps
  }

  async _updateListChanges(listName) {
    const filePath = path.join(
      this.basePath,
      this.config.dataListDir,
      `${listName}.json`
    )
    const list = await readJsonFile(filePath)
    const listConfig = this.config.lists[listName]
    const updatedList = []
    list.forEach((item) => {
      const updatedProps = this._updatePropsChanges(
        item,
        listConfig.props,
        listConfig.locales
      )
      updatedList.push({ id: item.id, ...updatedProps })
    })
    await writeJsonFile(filePath, updatedList)
    console.log(`list '${listName}' updated`)
  }

  async _updatePageCollectionChanges(pageCollectionName) {
    const dirPath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      pageCollectionName
    )
    const files = fs.readdirSync(dirPath)

    const pageCollectionConfig = this.config.pages[pageCollectionName]

    const _self = this
    function updateComponent(component, locales) {
      const propsConfig = _self.config.components[component.componentId].props
      component.props = component.props = _self._updatePropsChanges(
        component.props,
        propsConfig,
        locales
      )
      if (component.children) {
        component.children.forEach((child) => {
          updateComponent(child, locales)
        })
      }
      return component
    }

    await asyncForEach(files, async (file) => {
      const fileName = path.join(
        this.basePath,
        this.config.pageCollectionDir,
        pageCollectionName,
        file
      )
      const page = await readJsonFile(fileName)

      const pageLocales = Object.keys(page.routes)

      page.props = this._updatePropsChanges(
        page.props,
        pageCollectionConfig.props,
        pageLocales
      )

      updateComponent(page.content, Object.keys(page.routes))
      await writeJsonFile(fileName, page)

      console.log(`page '${pageCollectionName}/${file}' updated`)
    })
  }

  async updateConfigChanges() {
    // update all lists
    await asyncForEach(Object.keys(this.config.lists), async (listName) => {
      await this._updateListChanges(listName)
    })

    await asyncForEach(
      Object.keys(this.config.pages),
      async (pageCollectionName) => {
        await this._updatePageCollectionChanges(pageCollectionName)
      }
    )
  }

  async _writeJsonFile(filePath, data) {
    return new Promise((resolve, reject) => {
      try {
        const jsonString = JSON.stringify(data, undefined, 2)
        fs.writeFile(
          path.join(this.basePath, filePath),
          jsonString,
          'utf8',
          function (err, data) {
            if (err) {
              return reject(err)
            }
            resolve()
          }
        )
      } catch (jsonError) {
        return reject(jsonError)
      }
    })
  }

  async getConfiguration() {
    return this.config
  }

  async getListItems(listName) {
    const filePath = path.join(
      this.basePath,
      this.config.dataListDir,
      `${listName}.json`
    )
    const list = await readJsonFile(filePath)
    const listConfig = this.config.lists[listName]
    list.forEach((item) => {
      const id = item.id
      const x = this._updatePropsChanges(
        item,
        listConfig.props,
        listConfig.locales
      )
      x.id = id
    })

    return list
  }

  async addListItem(listName, item) {
    const filePath = path.join(
      this.basePath,
      this.config.dataListDir,
      `${listName}.json`
    )
    const list = await readJsonFile(filePath)
    list.push({ id: uuid(), ...item })
    await writeJsonFile(filePath, list)
    return list
  }

  async deleteListItem(listName, id) {
    const filePath = path.join(
      this.basePath,
      this.config.dataListDir,
      `${listName}.json`
    )
    const list = await readJsonFile(filePath)
    const newList = list.filter((i) => i.id !== id)
    await writeJsonFile(filePath, newList)
    return newList
  }

  async updateListItem(listName, id, item) {
    const filePath = path.join(
      this.basePath,
      this.config.dataListDir,
      `${listName}.json`
    )
    const list = await readJsonFile(filePath)
    const newList = list.map((i) => (i.id !== id ? i : { ...item, id: i.id }))
    await writeJsonFile(filePath, newList)
    return newList
  }

  async getPageCollection(collection) {
    const dirPath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      collection
    )
    const files = fs.readdirSync(dirPath)
    const items = []
    await asyncForEach(files, async (file) => {
      const pageData = await readJsonFile(
        path.join(
          this.basePath,
          this.config.pageCollectionDir,
          collection,
          file
        )
      )
      delete pageData.content
      pageData.fileName = file
      items.push(pageData)
    })
    return items
  }

  async getPage(collection, fileName) {
    const filePath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      collection,
      fileName
    )
    const page = await readJsonFile(filePath)
    page.fileName = fileName
    return page
  }

  async createPage(collection, page) {
    if (!page.fileName) {
      throw new Error('file name is required')
    }
    const locales = Object.keys(page.routes)
    const template = this.config.pages[collection].template
    const fileName = page.fileName
    page.id = uuid()
    page.dateCreated = new Date()
    page.dateLastModified = new Date()
    page.fileName = undefined

    page.props = this._updatePageProps(
      page.props,
      this.config.pages[collection].props,
      locales
    )

    page.content = this._createPageContentFromTemplate(template, locales)
    const filePath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      collection,
      fileName
    )
    if (fs.existsSync(filePath)) {
      throw new Error('file exists')
    }
    await writeJsonFile(filePath, page)
  }

  async updatePage(collection, fileName, page) {
    const locales = Object.keys(page.routes)
    page.dateLastModified = new Date()

    page.props = this._updatePageProps(
      page.props,
      this.config.pages[collection].props,
      locales
    )

    page.content = this._updatePageContent(page.content, locales)
    const filePath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      collection,
      fileName
    )
    await writeJsonFile(filePath, page)
  }

  async updatePageContent(collection, fileName, content) {
    const page = await this.getPage(collection, fileName)
    page.dateLastModified = new Date()
    page.content = content
    const filePath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      collection,
      fileName
    )
    await writeJsonFile(filePath, page)
  }

  async deletePage(collection, fileName) {
    const filePath = path.join(
      this.basePath,
      this.config.pageCollectionDir,
      collection,
      fileName
    )
    await fs.unlinkSync(filePath)
    return { message: 'file deleted' }
  }
}
module.exports = SsgAdminService
