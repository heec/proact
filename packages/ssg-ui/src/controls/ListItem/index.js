import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const Item = styled.li`
  margin: 0;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  &:not(:first-child) {
    border-top: solid 1px ${theme.colors.greyLight};
  }
  &:hover {
    background-color: ${theme.colors.greyLighter};
  }
`

const Title = styled.div`
  ${theme.text.subtitle1()};
`

export default function (props) {
  const { title, children, onClick } = props
  return (
    <Item onClick={() => {}}>
      {title && <Title>{title}</Title>}
      {children}
    </Item>
  )
}
