import React, { useState, useEffect } from 'react'

import EditIcon from '../../../icons/Edit'
import IconButton from '../../../controls/IconButton'
import Popup from '../../../controls/Popup'
import EditListItemForm from './EditListItemForm'

export default function (props) {
  const { item, fields, locales } = props
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
        <Popup onClose={closePopup} title="Edit List Item">
          <EditListItemForm
            item={item}
            fields={fields}
            locales={locales}
            onClose={closePopup}
          />
        </Popup>
      )}
    </>
  )
}
