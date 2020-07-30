import { getListItems } from '../services/dataList/getListItems'
import { addListItem } from '../services/dataList/addListItem'
import { updateListItem } from '../services/dataList/updateListItem'
import { deleteListItem } from '../services/dataList/deleteListItem'
import mutations from './mutations'

const actions = {
  loadList: (listName) => async (dispatch, getState) => {
    try {
      dispatch(mutations.loadListPending())

      const { app } = getState()
      const { configuration } = app

      // configuration
      const listConfiguration = configuration.lists[listName]
      dispatch(mutations.setConfiguration(listName, listConfiguration))

      // load items
      const items = await getListItems(listName)
      dispatch(mutations.setListItems(items))

      dispatch(mutations.loadListCompleted())
    } catch (err) {
      dispatch(mutations.loadListFailed(err))
    }
  },
  unloadList: () => async (dispatch, getState) => {
    dispatch(mutations.unloadList())
  },
  addItem: (item) => async (dispatch, getState) => {
    dispatch(mutations.updateListPending())
    const { dataList } = getState()
    const updatedItems = await addListItem(dataList.listName, item)
    dispatch(mutations.setListItems(updatedItems))
    dispatch(mutations.updateListCompleted())
  },
  updateItem: (item) => async (dispatch, getState) => {
    dispatch(mutations.updateListPending())
    const { dataList } = getState()
    const updatedItems = await updateListItem(dataList.listName, item)
    dispatch(mutations.setListItems(updatedItems))
    dispatch(mutations.updateListCompleted())
  },
  deleteItem: (id) => async (dispatch, getState) => {
    dispatch(mutations.updateListPending())
    const { dataList } = getState()
    const updatedItems = await deleteListItem(dataList.listName, id)
    dispatch(mutations.setListItems(updatedItems))
    dispatch(mutations.updateListCompleted())
  },
}

export default actions
