import React, { useState, useEffect } from 'react'

import EditIcon from '../../../icons/Edit'
import IconButton from '../../../controls/IconButton'
import Popup from '../../../controls/Popup'
import EditPageForm from './EditPageForm'

export default function (props) {
  const { page, fields, locales } = props
  const [open, setOpen] = useState(false)

  function openPopup() {
    setOpen(true)
  }

  function closePopup() {
    setOpen(false)
  }

  return (
    <>
      <IconButton icon={<EditIcon />} onClick={openPopup}></IconButton>
      {open && (
        <Popup onClose={closePopup} title="Edit Page">
          <EditPageForm page={page} locales={locales} onClose={closePopup} />
        </Popup>
      )}
    </>
  )
}
