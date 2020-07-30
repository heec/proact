import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.div`
  display: flex;
  ${theme.margin(1, -1)};
  button {
    ${theme.margin(0, 1)};
  }
`

export default function (props) {
  const { children } = props
  return <Root>{children}</Root>
}
