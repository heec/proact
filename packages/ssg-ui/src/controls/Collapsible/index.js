import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  &.collapsible-open {
    max-height: auto;
    transition: max-height 0.25s ease-out;
  }
  &.collapsible-closed {
    max-height: 0;
    transition: max-height 0.25s ease-out;
  }
`

export default ({ children, open }) => {
  const wrapper = useRef()

  useEffect(() => {
    if (wrapper.current) {
      const elm = wrapper.current
      if (open) {
        elm.style.maxHeight = `${elm.scrollHeight}px`
        window.setTimeout(() => {
          elm.style.maxHeight = 'none'
        }, 500)
      } else {
        elm.style.maxHeight = `${elm.scrollHeight}px`
        window.setTimeout(() => {
          elm.style.maxHeight = 0
        }, 50)
      }
    }
  }, [open])

  const classes = []
  if (open) {
    classes.push('collapsible-open')
  } else {
    classes.push('collapsible-closed')
  }

  return (
    <Root className={classes.join(' ')} ref={wrapper} style={{ maxHeight: 0 }}>
      {children}
    </Root>
  )
}
