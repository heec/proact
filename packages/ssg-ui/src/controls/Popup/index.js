import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Backdrop from '../Backdrop'
import IconButton from '../IconButton'
import CloseIcon from '../../icons/Close'
import theme from '../../theme'

const Popup = styled.div`
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
  background-color: #fff;
  z-index: 2;
  overflow: hidden;
  max-width: 500px;
  min-width: 300px;
  ${theme.elevate(2)};
  flex-grow: 1;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: ${theme.colors.greyLighter};
  ${theme.padding(0, 2)};
`

const Title = styled.h4`
  ${theme.padding(0.5, 0)};
  ${theme.margin(0)};
`

const Content = styled.div`
  ${theme.padding(2)};
  max-height: calc(100vh - 60px);
  overflow: auto;
`

const Footer = styled.div`
  ${theme.padding(1, 2)};
`

function PopupComponent(props) {
  const { modal, title, actions, onClose, children } = props

  function handleClose() {
    if (onClose && !modal) {
      onClose()
    }
  }

  return (
    <Backdrop>
      <Popup>
        <Header>
          <Title>{title}</Title>
          <IconButton icon={<CloseIcon />} onClick={handleClose} />
        </Header>
        <Content>{children}</Content>
        {actions && <Footer>{actions}</Footer>}
      </Popup>
    </Backdrop>
  )
}

const popupPortal = document.createElement('div')
document.body.appendChild(popupPortal)

export default (props) => {
  return ReactDOM.createPortal(<PopupComponent {...props} />, popupPortal)
}
