import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import GlobalStyles from './theme/GlobalStyles'
import AppRoutes from './routes'
import Loader from './controls/Loader'
import appActions from './store/app/actions'

export default function () {
  const dispatch = useDispatch()
  const { initialized } = useSelector((state) => state.app)

  useEffect(() => {
    async function initialize() {
      await dispatch(appActions.initializeApp())
    }
    initialize()
  }, [])

  return (
    <>
      <GlobalStyles />
      {initialized ? (
        <Router basename="admin">
          <AppRoutes />
        </Router>
      ) : (
        <Loader />
      )}
    </>
  )
}
