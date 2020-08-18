import { v4 as uuid } from 'uuid'
import { createItem } from '../../utils/createItem'
import { getPage } from '../services/pages/getPage'
import { getPageCollection } from '../services/pages/getPageCollection'
import { getListItems } from '../services/dataList/getListItems'
import { updatePageContent } from '../services/pages/updatePageContent'
import asyncForEach from '../../utils/asyncForEach'
import mutations from './mutations'

const actions = {
  loadPage: (pageCollectionName, fileName) => async (dispatch, getState) => {
    try {
      dispatch(mutations.loadPagePending())

      // load lists
      const { app } = getState()
      const listsConfig = app.configuration.lists
      const lists = {}
      await asyncForEach(Object.keys(listsConfig), async (listName) => {
        const items = await getListItems(listName)
        lists[listName] = items
      })

      const pagesConfig = app.configuration.pages
      const pageCollections = {}
      await asyncForEach(
        Object.keys(pagesConfig),
        async (pageCollectionName) => {
          const pages = await getPageCollection(pageCollectionName)
          pageCollections[pageCollectionName] = pages
        }
      )

      const page = await getPage(pageCollectionName, fileName)
      dispatch(
        mutations.setConfiguration(
          pageCollectionName,
          {
            name: page.name,
            fileName: page.fileName,
            routes: page.routes,
            id: page.id,
            props: page.props,
            dateCreated: page.dateCreated,
            dateLastModified: page.dateLastModified,
          },
          Object.keys(page.routes),
          lists,
          pageCollections
        )
      )
      dispatch(mutations.setPageContent(page.content))

      dispatch(mutations.loadPageCompleted())
    } catch (err) {
      dispatch(mutations.loadPageFailed(err))
    }
  },
  updatePageContent: () => async (dispatch, getState) => {
    dispatch(mutations.updatePagePending())
    const { pageBuilder } = getState()
    const { pageCollectionName, page, pageContent } = pageBuilder
    await updatePageContent(pageCollectionName, page.fileName, pageContent)
    dispatch(mutations.updatePageCompleted())
  },
  addComponent: (parentId, componentId, index) => async (
    dispatch,
    getState
  ) => {
    const { app, pageBuilder } = getState()
    const { configuration } = app
    const { pageComponentsById, pageContent, locales } = pageBuilder

    const template = configuration.components[componentId]
    const props = createItem(template.props, locales)

    const newComponent = {
      id: uuid(),
      componentId,
      props,
      children: template.children ? [] : undefined,
    }

    pageComponentsById[parentId].children.splice(index, 0, newComponent)
    dispatch(mutations.setPageContent(pageContent))
  },
  deleteComponent: (parentId, componentId) => async (dispatch, getState) => {
    const { pageBuilder } = getState()
    const { pageComponentsById, pageContent } = pageBuilder

    const index = pageComponentsById[parentId].children.findIndex(
      (c) => c.id === componentId
    )
    pageComponentsById[parentId].children.splice(index, 1)
    dispatch(mutations.setPageContent(pageContent))
  },
  moveComponent: (source, target) => async (dispatch, getState) => {
    const { pageBuilder } = getState()
    const { pageComponentsById, pageContent } = pageBuilder

    // clone and insert item
    const clone = JSON.parse(JSON.stringify(pageComponentsById[source.id]))
    clone.id = uuid()
    pageComponentsById[target.id].children.splice(target.index, 0, clone)

    // delete old item
    const index = pageComponentsById[source.parentId].children.findIndex(
      (c) => c.id === source.id
    )
    pageComponentsById[source.parentId].children.splice(index, 1)

    dispatch(mutations.setPageContent(pageContent))
  },
  handleChange: (nodeId, propName, locale, value) => async (
    dispatch,
    getState
  ) => {
    dispatch(mutations.updateNode(nodeId, propName, locale, value))
  },
  unloadPage: () => async (dispatch, getState) => {
    dispatch(mutations.unloadPage())
  },
}

export default actions
