import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  width: ${theme.spacing(5)};
  height: ${theme.spacing(5)};
  background-color: transparent;
  cursor: pointer;
`

export default function (props) {
  const { icon, onClick } = props
  return <Root onClick={onClick}>{icon}</Root>
}
