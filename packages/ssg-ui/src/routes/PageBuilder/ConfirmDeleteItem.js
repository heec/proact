import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import pageBuilderActions from '../../store/pageBuilder/actions'
import Button from '../../controls/Button'
import ButtonRow from '../../controls/ButtonRow'
const Root = styled.div``

export default function (props) {
  const { component, parentComponent, onClose } = props

  const dispatch = useDispatch()

  async function handleDelete() {
    dispatch(
      pageBuilderActions.deleteComponent(parentComponent.id, component.id)
    )
  }

  function handleCancel() {
    onClose()
  }

  return (
    <>
      <p>Delete Component?</p>
      <ButtonRow>
        <Button label="Delete" color="primary" onClick={handleDelete} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </>
  )
}
