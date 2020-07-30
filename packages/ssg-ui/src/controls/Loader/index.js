import React from 'react'
import styled, { keyframes } from 'styled-components'

import theme from '../../theme'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  > div {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(99, 99, 99, 0.1);
    border-top-color: ${theme.colors.primary};
    border-radius: 100%;
    animation: ${rotate} 0.9s infinite linear;
  }
  &.small {
    > div {
      width: 22px;
      height: 22px;
      border-width: 2px;
    }
  }
  &.large {
    > div {
      width: 60px;
      height: 60px;
      border-width: 6px;
    }
  }
`

export default function (props) {
  const { size = 'medium' } = props
  return (
    <Root className={size}>
      <div>
        <span />
        <span />
        <span />
      </div>
    </Root>
  )
}
