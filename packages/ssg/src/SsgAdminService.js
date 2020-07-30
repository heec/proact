const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const asyncForEach = require('./utils/asyncForEach')

class SsgAdminService {
  constructor(config) {
    this.basePath = path.join(config.projectDir, config.contentDir)
    this.config = config

    // todo: validate directories and configuration
  }

  _getDefaultPropValue(def) {
    if (def.defaultValue) {
      return def.defaultValue
    }

    switch (def.type) {
      case 'int':
      case 'float':
        return 0
      case 'string':
      case 'text':
      case 'markdown':
      case 'asset':
      case 'select':
        return ''
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

  async _readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(this.basePath, filePath), 'utf8', function (
        err,
        data
      ) {
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
    const filePath = path.join('lists', `${listName}.json`)
    const list = await this._readJsonFile(filePath)
    return list
  }

  async addListItem(listName, item) {
    const filePath = path.join('lists', `${listName}.json`)
    const list = await this._readJsonFile(filePath)
    item.id = uuid()
    list.push(item)
    await this._writeJsonFile(filePath, list)
    return list
  }

  async deleteListItem(listName, id) {
    const filePath = path.join('lists', `${listName}.json`)
    const list = await this._readJsonFile(filePath)
    const newList = list.filter((i) => i.id !== id)
    await this._writeJsonFile(filePath, newList)
    return newList
  }

  async updateListItem(listName, id, item) {
    const filePath = path.join('lists', `${listName}.json`)
    const list = await this._readJsonFile(filePath)
    const newList = list.map((i) => (i.id !== id ? i : { ...item, id: i.id }))
    await this._writeJsonFile(filePath, newList)
    return newList
  }

  async getPageCollection(collection) {
    const dirPath = path.join(this.basePath, 'pages', collection)
    const files = fs.readdirSync(dirPath)
    const items = []
    await asyncForEach(files, async (file) => {
      const pageData = await this._readJsonFile(
        path.join('pages', collection, file)
      )
      delete pageData.content
      items.push(pageData)
    })
    return items
  }

  async getPage(collection, fileName) {
    const filePath = path.join('pages', collection, fileName)
    const file = await this._readJsonFile(filePath)
    return file
  }

  async createPage(collection, page) {
    if (!page.fileName) {
      throw new Error('file name is required')
    }
    page.id = uuid()
    page.dateCreated = new Date()
    page.dateLastModified = new Date()
    const locales = Object.keys(page.routes)
    const template = this.config.pages[collection].template
    page.content = this._createPageContentFromTemplate(template, locales)
    const filePath = path.join('pages', collection, page.fileName)
    if (fs.existsSync(path.join(this.basePath, filePath))) {
      throw new Error('file exists')
    }
    await this._writeJsonFile(filePath, page)
  }

  async updatePage(collection, fileName, page) {
    const locales = Object.keys(page.routes)
    page.dateLastModified = new Date()
    const content = this._updatePageContent(page.content, locales)
    const filePath = path.join('pages', collection, fileName)
    await this._writeJsonFile(filePath, page)
  }

  async updatePageContent(collection, fileName, content) {
    const page = await this.getPage(collection, fileName)
    page.dateLastModified = new Date()
    page.content = content
    const filePath = path.join('pages', collection, fileName)
    await this._writeJsonFile(filePath, page)
  }

  async deletePage(collection, fileName) {
    const filePath = path.join(this.basePath, 'pages', collection, fileName)
    await fs.unlinkSync(filePath)
    return { message: 'file deleted' }
  }

  // async savePage(collection, page) {
  //   await this._readJsonFile('config.json')
  //   return config
  // }
}
module.exports = SsgAdminService
