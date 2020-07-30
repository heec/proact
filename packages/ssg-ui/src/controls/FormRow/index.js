import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Row = styled.div`
  ${theme.margin(2, 0)}
`

const Label = styled.label`
  font-size: ${theme.fontSize.small};
`

const FormControl = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.greyLight};
  ${theme.margin(0.5, 0)};
  ${theme.padding(0.5)};
  input,
  textarea {
    flex-basis: 100%;
    border: none;
  }
`

export default function (props) {
  const { label, children } = props
  return (
    <Row>
      <Label>{label}</Label>
      <FormControl>{children}</FormControl>
    </Row>
  )
}
