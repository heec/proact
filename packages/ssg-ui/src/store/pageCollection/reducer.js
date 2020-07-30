import { types } from './mutations'

const initialState = {
  pageCollectionName: null,
  pageCollectionConfiguration: null,
  items: null,
  updatePending: false,
  updateError: null,
  loaded: false,
  error: null,
}

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.LOAD_PAGE_COLLECTION_PENDING: {
      return { ...initialState }
    }
    case types.LOAD_PAGE_COLLECTION_COMPLETED: {
      return { ...state, loaded: true }
    }
    case types.LOAD_PAGE_COLLECTION_FAILED: {
      return { ...state, loaded: true, error: action.error }
    }
    case types.SET_PAGE_COLLECTION_CONFIGURATION: {
      return {
        ...state,
        pageCollectionName: action.pageCollectionName,
        pageCollectionConfiguration: action.pageCollectionConfiguration,
      }
    }
    case types.SET_PAGE_COLLECTION_ITEMS: {
      return { ...state, items: action.items }
    }
    case types.UPDATE_PAGE_COLLECTION_PENDING: {
      return { ...state, updatePending: true, updateError: null }
    }
    case types.UPDATE_PAGE_COLLECTION_COMPLETED: {
      return { ...state, updatePending: false }
    }
    case types.UPDATE_PAGE_COLLECTION_FAILED: {
      return { ...state, updatePending: false, updateError: action.error }
    }
    case types.UNLOAD_PAGE_COLLECTION: {
      return { ...initialState }
    }

    default:
      return state
  }
}
