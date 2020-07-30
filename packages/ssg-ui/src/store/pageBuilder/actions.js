import { v4 as uuid } from 'uuid'
import { createItem } from '../../utils/createItem'
import { getPage } from '../services/pages/getPage'
import { updatePageContent } from '../services/pages/updatePageContent'
import mutations from './mutations'

const actions = {
  loadPage: (pageCollectionName, fileName) => async (dispatch, getState) => {
    try {
      dispatch(mutations.loadPagePending())

      const page = await getPage(pageCollectionName, fileName)
      dispatch(
        mutations.setConfiguration(
          pageCollectionName,
          fileName,
          page.name,
          Object.keys(page.routes)
        )
      )
      dispatch(mutations.setPageContent(page.content))

      dispatch(mutations.loadPageCompleted())
    } catch (err) {
      console.log(err)
      dispatch(mutations.loadPageFailed(err))
    }
  },
  updatePageContent: () => async (dispatch, getState) => {
    dispatch(mutations.updatePagePending())
    const { pageBuilder } = getState()
    const { pageCollectionName, fileName, pageContent } = pageBuilder
    await updatePageContent(pageCollectionName, fileName, pageContent)
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
    console.log(target.index)
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
