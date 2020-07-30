import React, { useState, useEffect } from 'react'

import DeleteIcon from '../../icons/Delete'
import IconButton from '../../controls/IconButton'
import Popup from '../../controls/Popup'
import ConfirmDeleteItem from './ConfirmDeleteItem'

export default function (props) {
  const { component, parentComponent, onDelete } = props
  const [open, setOpen] = useState(false)

  function openPopup() {
    setOpen(true)
  }

  function closePopup() {
    setOpen(false)
  }

  return (
    <>
      <IconButton icon={<DeleteIcon />} onClick={openPopup}></IconButton>
      {open && (
        <Popup onClose={closePopup} title="Delete Component">
          <ConfirmDeleteItem
            component={component}
            parentComponent={parentComponent}
            onClose={closePopup}
            onDelete={onDelete}
          />
        </Popup>
      )}
    </>
  )
}
