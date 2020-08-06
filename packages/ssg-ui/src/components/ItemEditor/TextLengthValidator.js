import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.div`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.greyDark};
  .field-error {
    color: ${theme.colors.error};
    font-weight: 600;
  }
`

export default function (props) {
  const { field, value } = props
  return (
    <Root>
      length: {value.length}
      {field.minLength && (
        <>
          {' | '}
          <span
            className={
              value.length < field.minLength ? 'field-error' : undefined
            }
          >
            min: {field.minLength}
          </span>
        </>
      )}
      {field.maxLength && (
        <>
          {' | '}
          <span
            className={
              value.length > field.maxLength ? 'field-error' : undefined
            }
          >
            max: {field.maxLength}
          </span>
        </>
      )}
    </Root>
  )
}
