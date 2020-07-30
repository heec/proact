import { combineReducers } from 'redux'
import { configureStore } from './confugureStrore'

import appReducer from './app/reducer'
import dataListReducer from './dataList/reducer'
import pageCollectionReducer from './pageCollection/reducer'
import pageBuilderReducer from './pageBuilder/reducer'

const rootReducer = combineReducers({
  app: appReducer,
  dataList: dataListReducer,
  pageCollection: pageCollectionReducer,
  pageBuilder: pageBuilderReducer,
})

const store = configureStore(rootReducer)

export default store
