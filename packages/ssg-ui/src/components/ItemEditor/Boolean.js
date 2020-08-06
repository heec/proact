import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'
import FormControl from './FormControl'

export default function (props) {
  const { field, value, locale, onChange } = props
  function handleChange(e) {
    onChange({ target: { value: e.target.checked } })
  }
  return (
    <FormControl>
      <input type="checkbox" checked={value} onChange={handleChange} />
    </FormControl>
  )
}
