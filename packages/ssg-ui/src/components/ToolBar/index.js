import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Root = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.spacing(8)};
  background-color: #ffffff;
  border-bottom: solid 1px ${theme.colors.grey};
  ${theme.padding(0, 3)}

  > i {
    margin-right: 8px;
  }
`

const Title = styled.h4`
  margin-right: auto;
`

const ToolBarButtonGroup = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(3)};
  grid-auto-flow: column;
  align-items: center;
`

export default function (props) {
  const { title, icon, children } = props
  return (
    <Root className="toolbar">
      {icon && icon}
      {title && <Title>{title}</Title>}
      <ToolBarButtonGroup>{children}</ToolBarButtonGroup>
    </Root>
  )
}
