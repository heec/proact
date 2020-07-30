import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

export default function (props) {
  const { config, value, locale, onChange } = props
  return (
    <textarea value={value} onChange={onChange} autoComplete="off"></textarea>
  )
}
