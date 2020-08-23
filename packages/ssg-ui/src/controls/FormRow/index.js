import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Row = styled.div`
  display: ${(props) => (props.inline ? 'flex' : 'block')};
  align-items: center;
  ${theme.margin(2, 0)}
`

const Label = styled.label`
  flex-basis: 200px;
  font-size: ${theme.fontSize.small};
`

const FormControl = styled.div`
  flex-grow: 1;
  display: flex;
  border: solid 1px ${theme.colors.grey};
  ${theme.margin(0.5, 0)};
  ${theme.padding(0.5)};
  input,
  textarea {
    flex-basis: 100%;
    border: none;
  }
`

export default function (props) {
  const { label, children, inline } = props
  return (
    <Row inline={inline}>
      <Label>{label}</Label>
      <FormControl>{children}</FormControl>
    </Row>
  )
}
