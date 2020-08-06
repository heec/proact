import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  input {
    min-height: 20px;
    min-width: 20px;
  }
`

export default function (props) {
  const { field, value, locale } = props
  const loc = field.localize ? locale : '*'

  if (!value || typeof !value[loc] === 'undefined') {
    return null
  }

  let displayValue = ''
  switch (field.type) {
    case 'boolean':
      return (
        <Root>
          <input type="checkbox" readonly checked={Boolean(value[loc])} />
        </Root>
      )
      break
    default:
      return <Root>{value[loc]}</Root>
  }
}
