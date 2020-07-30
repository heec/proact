import React, { useState, useEffect } from 'react'

import DeleteIcon from '../../../icons/Delete'
import IconButton from '../../../controls/IconButton'
import Popup from '../../../controls/Popup'
import ConfirmDeletePage from './ConfirmDeletePage'

export default function (props) {
  const { page } = props
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
        <Popup onClose={closePopup} title="Delete Page">
          <ConfirmDeletePage item={page} onClose={closePopup} />
        </Popup>
      )}
    </>
  )
}
