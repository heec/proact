export const types = {
  LOAD_PAGE_COLLECTION_PENDING: 'LOAD_PAGE_COLLECTION_PENDING',
  LOAD_PAGE_COLLECTION_COMPLETED: 'LOAD_PAGE_COLLECTION_COMPLETED',
  LOAD_PAGE_COLLECTION_FAILED: 'LOAD_PAGE_COLLECTION_FAILED',
  SET_PAGE_COLLECTION_CONFIGURATION: 'SET_PAGE_COLLECTION_CONFIGURATION',
  SET_PAGE_COLLECTION_ITEMS: 'SET_PAGE_COLLECTION_ITEMS',
  UPDATE_PAGE_COLLECTION_PENDING: 'UPDATE_PAGE_COLLECTION_PENDING',
  UPDATE_PAGE_COLLECTION_COMPLETED: 'UPDATE_PAGE_COLLECTION_COMPLETED',
  UPDATE_PAGE_COLLECTION_FAILED: 'UPDATE_PAGE_COLLECTION_FAILED',
  UNLOAD_PAGE_COLLECTION: 'UNLOAD_PAGE_COLLECTION',
}

export default {
  loadPageCollectionPending: () => ({
    type: types.LOAD_PAGE_COLLECTION_PENDING,
  }),
  loadPageCollectionCompleted: () => ({
    type: types.LOAD_PAGE_COLLECTION_COMPLETED,
  }),
  loadPageCollectionFailed: (error) => ({
    type: types.LOAD_PAGE_COLLECTION_FAILED,
    error,
  }),
  setPageCollectionItems: (items) => ({
    type: types.SET_PAGE_COLLECTION_ITEMS,
    items,
  }),
  setConfiguration: (pageCollectionName, pageCollectionConfiguration) => ({
    type: types.SET_PAGE_COLLECTION_CONFIGURATION,
    pageCollectionName,
    pageCollectionConfiguration,
  }),
  updatePageCollectionPending: () => ({
    type: types.UPDATE_PAGE_COLLECTION_PENDING,
  }),
  updatePageCollectionCompleted: () => ({
    type: types.UPDATE_PAGE_COLLECTION_COMPLETED,
  }),
  updatePageCollectionFailed: (error) => ({
    type: types.UPDATE_PAGE_COLLECTION_FAILED,
    error,
  }),
  unloadPageCollection: () => ({
    type: types.UNLOAD_PAGE_COLLECTION,
  }),
}
