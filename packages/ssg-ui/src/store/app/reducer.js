import { types } from './mutations'

const initialState = {
  initialized: false,
  configuration: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INITIALIZE_APP_PENDING: {
      return {
        ...state,
        initialized: false,
      }
    }

    case types.INITIALIZE_APP_COMPLETED: {
      return {
        ...state,
        initialized: true,
      }
    }

    case types.INITIALIZE_APP_FAILED: {
      return {
        ...state,
        error: action.error,
      }
    }

    case types.SET_CONFIGURATION: {
      return {
        ...state,
        configuration: action.configuration,
      }
    }

    default:
      return state
  }
}
