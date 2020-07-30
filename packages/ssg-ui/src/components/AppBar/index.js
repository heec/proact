import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import theme from '../../theme'

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${theme.spacing(7)};
  display: flex;
  align-items: center;
  border: none;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.secondaryContrast};
  ${theme.padding(0, 2)}
  a {
    color: #ffffff;
  }
`

export default function (props) {
  const { children } = props
  const { configuration } = useSelector((state) => state.app)
  return (
    <Header id="appbar">
      <NavLink to="/">{configuration.siteName}</NavLink>
    </Header>
  )
}
