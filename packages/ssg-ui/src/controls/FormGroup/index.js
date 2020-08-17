import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.div`
  ${theme.margin(2, 0)};
`

const Title = styled.h4`
  margin: ${theme.spacing(0)};
  margin-bottom: ${theme.spacing(0.5)};
`

const FormGroup = styled.div`
  ${theme.padding(2)};
  border: dashed 1px ${theme.colors.greyLight};
`

export default function (props) {
  const { children, title } = props
  return (
    <Root>
      {title && <Title>{title}</Title>}
      <FormGroup>{children}</FormGroup>
    </Root>
  )
}
