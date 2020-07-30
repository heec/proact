import React from 'react'
import styled from 'styled-components'

const Root = styled.div``

export default function (props) {
  const { field, value, locale } = props
  return <Root>{value && value[field.localize ? locale : '*']}</Root>
}
