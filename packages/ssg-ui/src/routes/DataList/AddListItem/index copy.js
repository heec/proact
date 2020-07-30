import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { toList } from '../../../utils/toList'
import Button from '../../../controls/Button'
import Popup from '../../../controls/Popup'
import LocaleSelector from '../../../components/LocaleSelector'
import PropertyEditor from '../../../components/PropertyEditor'

const Root = styled.div``

export default function (props) {
  const { listConfig } = props
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const item = {}
    const locales = {}
    listConfig.locales.forEach((loc) => {
      locales[loc] = ''
    })

    toList(listConfig.props).forEach((prop) => {
      switch (prop.type) {
        case 'string':
        case 'text':
      }
      item[prop.key] = { ...locales }
    })
  })

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
          <LocaleSelector
            value={locale}
            locales={listConfig.locales}
            onChange={(loc) => {
              setLocale(loc)
            }}
          />
          {toList(listConfig.props).map((prop) => (
            <PropertyEditor config={prop} key={prop.key} locale={locale} />
          ))}
        </Popup>
      )}
    </>
  )
}
