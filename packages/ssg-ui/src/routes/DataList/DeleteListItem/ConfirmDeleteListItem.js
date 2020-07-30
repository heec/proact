import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import dataListActions from '../../../store/dataList/actions'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'

const Root = styled.div``

export default function (props) {
  const { item, onClose } = props
  const dispatch = useDispatch()

  async function handleDelete() {
    await dispatch(dataListActions.deleteItem(item.id))
    onClose()
  }

  function handleCancel() {
    onClose()
  }

  return (
    <>
      <p>Delete Item?</p>
      <ButtonRow>
        <Button label="Delete" color="primary" onClick={handleDelete} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </>
  )
}
