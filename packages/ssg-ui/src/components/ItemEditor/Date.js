import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import theme from '../../theme'
import FormControl from './FormControl'

export default function (props) {
  const { field, value, locale, onChange } = props

  function handleOnChange(date) {
    console.log(date)
    console.log(typeof date)
    onChange({ target: { value: date.toISOString() } })
  }

  return (
    <FormControl>
      <DatePicker
        selected={value ? new Date(value) : undefined}
        onChange={handleOnChange}
      />
    </FormControl>
  )
}
