import React from 'react'
import styled from 'styled-components'

import Button from '../../controls/Button'
import MobileIcon from '../../icons/Mobile'
import TabletIcon from '../../icons/Tablet'
import DesktopIcon from '../../icons/Desktop'
import theme from '../../theme'

const Root = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(1)};
  grid-auto-flow: column;
  align-items: center;
  button {
    padding: 0;
  }
`

export default function (props) {
  const { value, onChange } = props
  return (
    <Root>
      <Button
        label={<DesktopIcon />}
        color={value === 'desktop' ? 'secondary' : undefined}
        onClick={() => {
          onChange('desktop')
        }}
      />
      <Button
        label={<TabletIcon />}
        color={value === 'tablet' ? 'secondary' : undefined}
        onClick={() => {
          onChange('tablet')
        }}
      />
      <Button
        label={<MobileIcon />}
        color={value === 'mobile' ? 'secondary' : undefined}
        onClick={() => {
          onChange('mobile')
        }}
      />
    </Root>
  )
}
