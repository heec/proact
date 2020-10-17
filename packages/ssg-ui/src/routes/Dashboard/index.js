import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import ToolBar from '../../components/ToolBar'
import PageContent from '../../components/PageContent'
import Paper from '../../controls/Paper'

const Root = styled.div``

export default function (props) {
  const {} = props
  return (
    <Root>
      <ToolBar></ToolBar>
      <PageContent>
        <h2>Tools</h2>
        <ul>
          <li>
            <NavLink to="/build">Build all Pages</NavLink>
          </li>
          <li>
            <NavLink to="/apply-config-changes">
              Apply Configuration Changes
            </NavLink>
          </li>
        </ul>
      </PageContent>
    </Root>
  )
}
