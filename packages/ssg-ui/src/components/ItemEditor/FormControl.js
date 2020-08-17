import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const FormControl = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.greyLight};
  ${theme.margin(0.5, 0)};
  ${theme.padding(0.5)};
  input,
  select,
  textarea {
    flex-basis: 100%;
    border: none;
  }
  .react-datepicker-wrapper {
    width: 100%;
    > div {
      display: block;
      > input {
        width: 100%;
      }
    }
  }
`

export default function (props) {
  return <FormControl>{props.children}</FormControl>
}
