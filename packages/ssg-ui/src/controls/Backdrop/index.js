import React, { useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeInBg = keyframes`
  from {
    opacity: 0.001;
  }
  to {
    opacity: 1;
  }
`

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 19;
  animation: ${fadeInBg} ease-in 0.2s;
`

export default function Backdrop(props) {
  const { onClick, children } = props
  const backdrop = useRef()

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth
    const handleResize = () => {
      // update content width
      const width = window.innerWidth - scrollbarWidth
      const $header = document.querySelector('#appbar')
      if ($header) {
        $header.style.width = `${width}px`
      }
      document.body.style.width = `${width}px`
      document.body.style.overflow = 'hidden'
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = null
      document.body.style.width = null
      const $header = document.querySelector('#appbar')
      if ($header) {
        $header.style.width = null
      }
    }
  }, [])

  function handleClick(e) {
    if (backdrop.current === e.target && typeof onClick === 'function') {
      onClick()
    }
  }
  return (
    <Root ref={backdrop} onClick={handleClick}>
      {children}
    </Root>
  )
}
