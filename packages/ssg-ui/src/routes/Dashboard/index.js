import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import ToolBar from '../../components/ToolBar'

const Root = styled.div``

export default function (props) {
  const {} = props
  return (
    <Root>
      <ToolBar>
        <NavLink to="/build">Build</NavLink>
      </ToolBar>
    </Root>
  )
}
