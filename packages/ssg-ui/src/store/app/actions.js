import { getConfiguration } from '../services/configuration/getConfiguration'
import mutations from './mutations'

const actions = {
  initializeApp: () => async (dispatch, getState) => {
    try {
      dispatch(mutations.initializeAppPending())
      const config = await getConfiguration()
      dispatch(mutations.setConfiguration(config))
      dispatch(mutations.initializeAppCompleted())
    } catch (err) {
      dispatch(mutations.initializeAppFailed(err))
    }
  },
}

export default actions
