import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { v4 as uuid } from 'uuid'
import { createItem } from '../utils/createItem'
import { getPage } from './services/pages/getPage'
import { updatePageContent } from './services/pages/updatePageContent'
import Loader from '../controls/Loader'

const PageBuilderContext = React.createContext()
export default PageBuilderContext

export const PageBuilderContextProvider = (props) => {
  const { children } = props
  const { collectionName, fileName } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [name, setName] = useState()
  const [locales, setLocales] = useState([])
  const [content, setContent] = useState()
  const [components, setComponents] = useState()
  const [componentsById, setComponentsById] = useState()
  const app = useSelector((state) => state.app)

  function createComponentIndex(pageContent, createNewId) {
    const _componentsById = {}
    const mapContent = (node) => {
      if (createNewId) {
        node.id = uuid()
      }
      _componentsById[node.id] = node
      if (node.children) {
        node.children.forEach((n) => {
          mapContent(n)
        })
      }
    }
    mapContent(pageContent)
    setComponentsById(_componentsById)
  }

  useEffect(() => {
    async function initialize() {
      const _page = await getPage(collectionName, fileName)
      const pageContent = JSON.parse(JSON.stringify(_page.content))
      createComponentIndex(pageContent)
      setComponents(app.configuration.components)
      setName(_page.name)
      setLocales(Object.keys(_page.routes))
      setContent(pageContent)
      setLoaded(true)
    }
    if (collectionName && fileName) {
      initialize()
    }
  }, [collectionName, fileName])

  const values = {
    state: {
      name,
      locales,
      content,
      components,
    },
    actions: {
      updatePageContent: async () => {
        await updatePageContent(collectionName, fileName, content)
      },
      addComponent: (parentId, componentId, index) => {
        const template = components[componentId]
        const props = createItem(template.props, locales)
        const newComponent = {
          id: uuid(),
          componentId,
          props,
          children: template.children ? [] : undefined,
        }
        componentsById[parentId].children.splice(index, 0, newComponent)
        const pageContent = JSON.parse(JSON.stringify(content))
        createComponentIndex(pageContent)
        setContent(pageContent)
      },
      deleteComponent: (parentId, componentId) => {
        const index = componentsById[parentId].children.findIndex(
          (c) => c.id === componentId
        )
        componentsById[parentId].children.splice(index, 1)
        const pageContent = JSON.parse(JSON.stringify(content))
        createComponentIndex(pageContent)
        setContent(pageContent)
      },
      moveComponent: (source, target) => {
        const clone = JSON.parse(JSON.stringify(componentsById[source.id]))
        clone.id = uuid()

        componentsById[target.id].children.splice(target.index, 0, clone)

        // delete item
        const index = componentsById[source.parentId].children.findIndex(
          (c) => c.id === source.id
        )
        componentsById[source.parentId].children.splice(index, 1)

        const pageContent = JSON.parse(JSON.stringify(content))
        createComponentIndex(pageContent)
        setContent(pageContent)
      },
      handleChange: (id, e) => {
        componentsById[id].props[e.name][e.locale] = e.value
        setContent({ ...content })
      },
    },
  }

  return (
    <PageBuilderContext.Provider value={values}>
      {loaded ? children : <Loader />}
    </PageBuilderContext.Provider>
  )
}
