import React, { useRef, useEffect } from 'react'

import FormControl from './FormControl'

export default function (props) {
  const { field, value, locale, onChange } = props

  const $textarea = useRef()

  useEffect(() => {
    $textarea.current.style.height = 'auto'
    $textarea.current.style.height = `${$textarea.current.scrollHeight}px`
  }, [value])

  return (
    <FormControl>
      <textarea
        ref={$textarea}
        value={value}
        onChange={onChange}
        onBlur={() => {
          setEditMode(false)
        }}
        autoComplete="off"
      ></textarea>
    </FormControl>
  )
}
