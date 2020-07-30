import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.div`
  background-color: #fff;
  ${theme.elevate(2)};
`

export default function (props) {
  const { children } = props
  return <Root>{children}</Root>
}
