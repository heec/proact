export const types = {
  LOAD_LIST_PENDING: 'LOAD_LIST_PENDING',
  LOAD_LIST_COMPLETED: 'LOAD_LIST_COMPLETED',
  LOAD_LIST_FAILED: 'LOAD_LIST_FAILED',
  SET_LIST_CONFIGURATION: 'SET_LIST_CONFIGURATION',
  SET_LIST_ITEMS: 'SET_LIST_ITEMS',
  UPDATE_LIST_PENDING: 'UPDATE_LIST_PENDING',
  UPDATE_LIST_COMPLETED: 'UPDATE_LIST_COMPLETED',
  UPDATE_LIST_FAILED: 'UPDATE_LIST_FAILED',
  UNLOAD_LIST: 'UNLOAD_LIST',
}

export default {
  loadListPending: () => ({
    type: types.LOAD_LIST_PENDING,
  }),
  loadListCompleted: () => ({
    type: types.LOAD_LIST_COMPLETED,
  }),
  loadListFailed: (error) => ({
    type: types.LOAD_LIST_FAILED,
    error,
  }),
  setListItems: (items) => ({
    type: types.SET_LIST_ITEMS,
    items,
  }),
  setConfiguration: (listName, listConfiguration) => ({
    type: types.SET_LIST_CONFIGURATION,
    listName,
    listConfiguration,
  }),
  updateListPending: () => ({
    type: types.UPDATE_LIST_PENDING,
  }),
  updateListCompleted: () => ({
    type: types.UPDATE_LIST_COMPLETED,
  }),
  updateListFailed: (error) => ({
    type: types.UPDATE_LIST_FAILED,
    error,
  }),
  unloadList: () => ({
    type: types.UNLOAD_LIST,
  }),
}
