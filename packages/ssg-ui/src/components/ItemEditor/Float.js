import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

export default function (props) {
  const { config, value, locale, onChange } = props
  return (
    <input type="number" value={value} onChange={onChange} autoComplete="off" />
  )
}
