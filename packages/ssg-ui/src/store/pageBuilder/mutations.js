export const types = {
  LOAD_PAGE_PENDING: 'LOAD_PAGE_PENDING',
  LOAD_PAGE_COMPLETED: 'LOAD_PAGE_COMPLETED',
  LOAD_PAGE_FAILED: 'LOAD_PAGE_FAILED',
  SET_PAGE_CONFIGURATION: 'SET_PAGE_CONFIGURATION',
  SET_PAGE_CONTENT: 'SET_PAGE_CONTENT',
  UPDATE_NODE: 'UPDATE_NODE',
  UPDATE_PAGE_PENDING: 'UPDATE_PAGE_PENDING',
  UPDATE_PAGE_COMPLETED: 'UPDATE_PAGE_COMPLETED',
  UPDATE_PAGE_FAILED: 'UPDATE_PAGE_FAILED',
  UNLOAD_PAGE: 'UNLOAD_PAGE',
}

export default {
  loadPagePending: () => ({
    type: types.LOAD_PAGE_PENDING,
  }),
  loadPageCompleted: () => ({
    type: types.LOAD_PAGE_COMPLETED,
  }),
  loadPageFailed: (error) => ({
    type: types.LOAD_PAGE_FAILED,
    error,
  }),
  setConfiguration: (
    pageCollectionName,
    page,
    locales,
    lists,
    pageCollections
  ) => ({
    type: types.SET_PAGE_CONFIGURATION,
    pageCollectionName,
    page,
    locales,
    lists,
    pageCollections,
  }),
  setPageContent: (pageContent) => ({
    type: types.SET_PAGE_CONTENT,
    pageContent,
  }),
  updateNode: (nodeId, propName, locale, value) => ({
    type: types.UPDATE_NODE,
    nodeId,
    propName,
    locale,
    value,
  }),
  updatePagePending: () => ({
    type: types.UPDATE_PAGE_PENDING,
  }),
  updatePageCompleted: () => ({
    type: types.UPDATE_PAGE_COMPLETED,
  }),
  updatePageFailed: (error) => ({
    type: types.UPDATE_PAGE_FAILED,
    error,
  }),
  unloadPage: () => ({
    type: types.UNLOAD_PAGE,
  }),
}
