import { getConfiguration } from '../services/configuration/getConfiguration'
import mutations from './mutations'
import { getPageCollection } from '../services/pages/getPageCollection'
import { getListItems } from '../services/dataList/getListItems'
import asyncForEach from '../../utils/asyncForEach'

const actions = {
  initializeApp: () => async (dispatch, getState) => {
    try {
      dispatch(mutations.initializeAppPending())
      const config = await getConfiguration()

      const listsConfig = config.lists
      const lists = {}
      await asyncForEach(Object.keys(listsConfig), async (listName) => {
        const items = await getListItems(listName)
        lists[listName] = items
      })

      console.log(2)
      const pagesConfig = config.pages
      const pageCollections = {}
      await asyncForEach(
        Object.keys(pagesConfig),
        async (pageCollectionName) => {
          const pages = await getPageCollection(pageCollectionName)
          pageCollections[pageCollectionName] = pages
        }
      )
      console.log(3)

      dispatch(mutations.setConfiguration(config))
      dispatch(mutations.setLists(lists))
      dispatch(mutations.setPageCollections(pageCollections))
      dispatch(mutations.initializeAppCompleted())
    } catch (err) {
      dispatch(mutations.initializeAppFailed(err))
    }
  },
}

export default actions
