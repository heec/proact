import { types } from './mutations'

const initialState = {
  listName: null,
  listConfiguration: null,
  items: null,
  updatePending: false,
  updateError: null,
  loaded: false,
  error: null,
}

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.LOAD_LIST_PENDING: {
      return { ...initialState }
    }
    case types.LOAD_LIST_COMPLETED: {
      return { ...state, loaded: true }
    }
    case types.LOAD_LIST_FAILED: {
      return { ...state, loaded: true, error: action.error }
    }
    case types.SET_LIST_CONFIGURATION: {
      return {
        ...state,
        listName: action.listName,
        listConfiguration: action.listConfiguration,
      }
    }
    case types.SET_LIST_ITEMS: {
      return { ...state, items: action.items }
    }
    case types.UPDATE_LIST_PENDING: {
      return { ...state, updatePending: true, updateError: null }
    }
    case types.UPDATE_LIST_COMPLETED: {
      return { ...state, updatePending: false }
    }
    case types.UPDATE_LIST_FAILED: {
      return { ...state, updatePending: false, updateError: action.error }
    }
    case types.UNLOAD_LIST: {
      return { ...initialState }
    }

    default:
      return state
  }
}
