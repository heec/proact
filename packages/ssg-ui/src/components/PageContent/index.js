import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.div`
  padding: ${theme.spacing(3)};
`

export default function (props) {
  const { children } = props
  return <Root>{children}</Root>
}
