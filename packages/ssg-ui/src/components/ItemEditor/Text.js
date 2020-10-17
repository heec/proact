import React, { useRef, useEffect } from 'react'

import FormControl from './FormControl'
import TextLengthValidator from './TextLengthValidator'

export default function (props) {
  const { field, value, locale, onChange } = props

  const $textarea = useRef()

  useEffect(() => {
    const y = window.pageYOffset
    $textarea.current.style.height = 'auto'
    $textarea.current.style.height = `${$textarea.current.scrollHeight}px`
    window.scrollTo(0, y)
  }, [value])

  return (
    <>
      <FormControl>
        <textarea
          ref={$textarea}
          value={value}
          onChange={onChange}
          autoComplete="off"
        ></textarea>
      </FormControl>
      <TextLengthValidator field={field} value={value} />
    </>
  )
}
