import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.label`
  display: inline-flex;
  align-items: center;
  input {
    width: ${theme.spacing(2.5)};
    height: ${theme.spacing(2.5)};
  }
  span {
    display: block;
    margin-left: ${theme.spacing(0.5)};
    margin-right: ${theme.spacing(2)};
  }
`

export default function (props) {
  const { label, name, value, checked, onChange } = props
  return (
    <Root>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </Root>
  )
}
