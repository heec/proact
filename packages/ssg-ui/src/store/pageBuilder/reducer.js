import { types } from './mutations'

const initialState = {
  pageCollectionName: null,
  page: null,
  pageContent: null,
  pageComponentsById: null,
  locale: null,
  locales: null,
  updatePending: false,
  updateError: null,
  loaded: false,
  error: null,
}

function createComponentIndex(pageContent) {
  const _componentsById = {}
  const mapContent = (node) => {
    // if (createNewId) {
    //   node.id = uuid()
    // }
    _componentsById[node.id] = node
    if (node.children) {
      node.children.forEach((n) => {
        mapContent(n)
      })
    }
  }
  mapContent(pageContent)
  return _componentsById
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_PAGE_PENDING: {
      return { ...initialState }
    }
    case types.LOAD_PAGE_COMPLETED: {
      return { ...state, loaded: true }
    }
    case types.LOAD_PAGE_FAILED: {
      return { ...state, loaded: true, error: action.error }
    }
    case types.SET_PAGE_CONFIGURATION: {
      return {
        ...state,
        pageCollectionName: action.pageCollectionName,
        page: action.page,
        locales: action.locales,
      }
    }
    case types.SET_PAGE_CONTENT: {
      const pageContent = JSON.parse(JSON.stringify(action.pageContent))
      return {
        ...state,
        pageContent: pageContent,
        pageComponentsById: createComponentIndex(pageContent),
      }
    }

    case types.UPDATE_NODE: {
      const { nodeId, propName, locale, value } = action
      state.pageComponentsById[nodeId].props[propName][locale] = value
      return { ...state, pageContent: { ...state.pageContent } }
    }
    case types.UPDATE_PAGE_PENDING: {
      return { ...state, updatePending: true, updateError: null }
    }
    case types.UPDATE_PAGE_COMPLETED: {
      return { ...state, updatePending: false }
    }
    case types.UPDATE_PAGE_FAILED: {
      return { ...state, updatePending: false, updateError: action.error }
    }

    case types.UNLOAD_PAGE: {
      return { ...initialState }
    }
    default:
      return state
  }
}
