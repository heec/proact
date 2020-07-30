import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const List = styled.ul`
  list-style: none;
  margin: ${theme.spacing(2)} 0;
  padding: 0;
  background-color: #fff;
  ${theme.elevate(1)};
`

export default function (props) {
  const { children } = props
  return <List>{children}</List>
}
