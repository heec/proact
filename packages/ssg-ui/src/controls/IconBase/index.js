import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Icon = styled.i`
  width: ${theme.spacing(3)};
  height: ${theme.spacing(2.5)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    height: ${theme.spacing(2.5)};
    fill: currentColor;
  }
`

export default function (props) {
  const { path, width, className } = props
  const classes = ['icon']
  if (className) {
    classes.push(className)
  }
  return (
    <Icon className={classes.join(' ')}>
      <svg viewBox={`0 0 ${width} 512`}>
        {path.map((p, i) => React.cloneElement(p, { key: i }))}
      </svg>
    </Icon>
  )
}
