import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'
import FormControl from './FormControl'
import TextLengthValidator from './TextLengthValidator'

export default function (props) {
  const { field, value, locale, onChange } = props
  return (
    <>
      <FormControl>
        <textarea
          value={value}
          onChange={onChange}
          autoComplete="off"
        ></textarea>
      </FormControl>
      <TextLengthValidator field={field} value={value} />
    </>
  )
}
