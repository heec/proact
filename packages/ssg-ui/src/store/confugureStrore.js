import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export const configureStore = (rootReducer, additionalMiddleware) => {
  const middleware = [thunk]

  if (typeof additionalMiddleware === 'function') {
    middleware.push(additionalMiddleware)
  } else if (
    typeof additionalMiddleware === 'object' &&
    typeof additionalMiddleware.forEach === 'function'
  ) {
    additionalMiddleware.forEach((mw) => {
      middleware.push(mw)
    })
  }

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

    /* eslint-disable */
    console.info('redux devtools enabled')
    /* eslint-enable */

    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(...middleware))
    )
    return store
  }

  return createStore(rootReducer, applyMiddleware(...middleware))
}
