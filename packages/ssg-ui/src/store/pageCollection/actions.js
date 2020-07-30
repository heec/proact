import { getPageCollection } from '../services/pages/getPageCollection'
import { deletePage } from '../services/pages/deletePage'
import { createPage } from '../services/pages/createPage'
import { updatePage } from '../services/pages/updatePage'
import { getPage } from '../services/pages/getPage'
import mutations from './mutations'

const actions = {
  loadPageCollection: (pageCollectionName) => async (dispatch, getState) => {
    try {
      dispatch(mutations.loadPageCollectionPending())

      const { app } = getState()
      const { configuration } = app

      // configuration
      const pageCollectionConfiguration =
        configuration.pages[pageCollectionName]

      dispatch(
        mutations.setConfiguration(
          pageCollectionName,
          pageCollectionConfiguration
        )
      )

      // load items
      const items = await getPageCollection(pageCollectionName)
      dispatch(mutations.setPageCollectionItems(items))

      dispatch(mutations.loadPageCollectionCompleted())
    } catch (err) {
      dispatch(mutations.loadPageCollectionFailed(err))
    }
  },
  deletePage: (fileName) => async (dispatch, getState) => {
    dispatch(mutations.updatePageCollectionPending())
    const { pageCollection } = getState()
    const updatedItems = await deletePage(
      pageCollection.pageCollectionName,
      fileName
    )
    dispatch(mutations.setPageCollectionItems(updatedItems))
    dispatch(mutations.updatePageCollectionCompleted())
  },
  createPage: (page) => async (dispatch, getState) => {
    dispatch(mutations.updatePageCollectionPending())
    const { pageCollection } = getState()
    const updatedItems = await createPage(
      pageCollection.pageCollectionName,
      page
    )
    dispatch(mutations.setPageCollectionItems(updatedItems))
    dispatch(mutations.updatePageCollectionCompleted())
  },
  updatePage: (page) => async (dispatch, getState) => {
    dispatch(mutations.updatePageCollectionPending())
    const { pageCollection } = getState()
    const updatedItems = await updatePage(
      pageCollection.pageCollectionName,
      page
    )
    dispatch(mutations.setPageCollectionItems(updatedItems))
    dispatch(mutations.updatePageCollectionCompleted())
  },
  getPage: (fileName) => async (dispatch, getState) => {
    const { pageCollection } = getState()
    const _page = await getPage(pageCollection.pageCollectionName, fileName)
    return _page
  },

  unloadPageCollection: (pageCollectionName) => async (dispatch, getState) => {
    dispatch(mutations.unloadPageCollection())
  },
}

export default actions
