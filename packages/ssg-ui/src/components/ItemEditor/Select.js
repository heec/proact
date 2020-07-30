import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

export default function (props) {
  const { field, value, locale, onChange } = props
  return (
    <select value={value} onChange={onChange}>
      {field.items.map((listItem) => (
        <option key={listItem.value} value={listItem.value}>
          {listItem.name}
        </option>
      ))}
    </select>
  )
}
