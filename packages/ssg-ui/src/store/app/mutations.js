export const types = {
  INITIALIZE_APP_PENDING: 'INITIALIZE_APP_PENDING',
  INITIALIZE_APP_COMPLETED: 'INITIALIZE_APP_COMPLETED',
  INITIALIZE_APP_FAILED: 'INITIALIZE_APP_FAILED',
  SET_LISTS: 'APP_SET_LISTS',
  SET_PAGE_COLLECTIONS: 'APP_SET_PAGE_COLLECTIONS',
  SET_CONFIGURATION: 'SET_CONFIGURATION',
}

export default {
  initializeAppPending: () => ({
    type: types.INITIALIZE_APP_PENDING,
  }),
  initializeAppCompleted: () => ({
    type: types.INITIALIZE_APP_COMPLETED,
  }),
  initializeAppFailed: (error) => ({
    type: types.INITIALIZE_APP_FAILED,
    error,
  }),
  setLists: (lists) => ({
    type: types.SET_LISTS,
    lists,
  }),
  setPageCollections: (pageCollections) => ({
    type: types.SET_PAGE_COLLECTIONS,
    pageCollections,
  }),
  setConfiguration: (configuration) => ({
    type: types.SET_CONFIGURATION,
    configuration,
  }),
}
