import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'
import Button from '../../controls/Button'

const Root = styled.div`
  ${theme.margin(2, 0)}
  display: flex;
  align-items: center;
`
const Label = styled.div`
  margin-right: ${theme.spacing(1)};
`

const Buttons = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(1)};
  grid-auto-flow: column;
  align-items: center;
  button {
    padding: 0;
  }
`

// const Button = styled.div`
//   display: flex;
//   align-items: center;
//   ${theme.padding(0, 1)}
//   border: solid 1px ${theme.colors.greyDark};
//   height: ${theme.spacing(5)};
//   cursor: pointer;
//   &.selected {
//     border-color: ${theme.colors.primary};
//     font-weight: 600;
//   }
// `

export default function (props) {
  const { locales, value, onChange } = props
  if (locales.length <= 1) {
    return null
  }
  return (
    <Root>
      <Label>Locales:</Label>
      <Buttons>
        {locales.map((loc) => (
          <Button
            key={loc}
            label={loc}
            color={loc === value ? 'secondary' : undefined}
            onClick={() => {
              onChange(loc)
            }}
          ></Button>
        ))}
      </Buttons>
    </Root>
  )
}
