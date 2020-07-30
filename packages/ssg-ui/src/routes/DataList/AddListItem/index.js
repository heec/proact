import React, { useState, useEffect } from 'react'

import Button from '../../../controls/Button'
import Popup from '../../../controls/Popup'
import AddListItemForm from './AddListItemForm'

export default function (props) {
  const { fields, locales } = props
  const [open, setOpen] = useState(false)

  function openPopup() {
    setOpen(true)
  }

  function closePopup() {
    setOpen(false)
  }

  return (
    <>
      <Button
        label="Create New Item"
        variant="primary"
        onClick={openPopup}
      ></Button>
      {open && (
        <Popup onClose={closePopup} title="Create New Item">
          <AddListItemForm
            fields={fields}
            locales={locales}
            onClose={closePopup}
          />
        </Popup>
      )}
    </>
  )
}
