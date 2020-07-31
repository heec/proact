import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import theme from '../theme'
import AppBar from '../components/AppBar'
import Navigation from '../components/Navigation'
import AssetsLibrary from './AssetsLibrary'
import Dashboard from './Dashboard'
import PageCollection from './PageCollection'
import PageBuilder from './PageBuilder'
import DataList from './DataList'

const Main = styled.main`
  padding-top: ${theme.spacing(15)};
  padding-left: ${theme.spacing(32)};
  .toolbar {
    position: fixed;
    top: ${theme.spacing(7)};
    left: ${theme.spacing(32)};
    right: 0;
  }
`

const PageBuilderContent = styled.main`
  padding-top: ${theme.spacing(15)};
  .toolbar {
    position: fixed;
    top: ${theme.spacing(7)};
    left: 0;
    right: 0;
  }
`

export default function (props) {
  const {} = props
  return (
    <Switch>
      <Route path="/pages/:collectionName/:fileName">
        <>
          <AppBar />
          <PageBuilderContent>
            <PageBuilder />
          </PageBuilderContent>
        </>
      </Route>
      <Route path="/">
        <>
          <AppBar />
          <Navigation />
          <Main>
            <Switch>
              <Route path="/pages/:collectionName/">
                <PageCollection />
              </Route>
              <Route path="/dataList/:listName">
                <DataList />
              </Route>
              <Route path="/assets/:path*">
                <AssetsLibrary />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Main>
        </>
      </Route>
    </Switch>
  )
}
