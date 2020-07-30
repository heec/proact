export const types = {
  INITIALIZE_APP_PENDING: 'INITIALIZE_APP_PENDING',
  INITIALIZE_APP_COMPLETED: 'INITIALIZE_APP_COMPLETED',
  INITIALIZE_APP_FAILED: 'INITIALIZE_APP_FAILED',
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
  setConfiguration: (configuration) => ({
    type: types.SET_CONFIGURATION,
    configuration,
  }),
}
