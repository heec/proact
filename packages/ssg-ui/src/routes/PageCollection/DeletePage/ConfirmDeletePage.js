import React from 'react'
import { useDispatch } from 'react-redux'

import pageCollectionActions from '../../../store/pageCollection/actions'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'

export default function (props) {
  const { item, onClose } = props
  const dispatch = useDispatch()

  async function handleDelete() {
    await dispatch(pageCollectionActions.deletePage(item.fileName))
    onClose()
  }

  function handleCancel() {
    onClose()
  }

  return (
    <>
      <p>Delete Page?</p>
      <ButtonRow>
        <Button label="Delete" color="primary" onClick={handleDelete} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </>
  )
}
