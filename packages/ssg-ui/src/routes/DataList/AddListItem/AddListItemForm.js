import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import dataListActions from '../../../store/dataList/actions'
import { createItem } from '../../../utils/createItem'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'
import LocaleSelector from '../../../components/LocaleSelector'
import ItemEditor from '../../../components/ItemEditor'

export default function (props) {
  const { fields, locales, onClose } = props
  const [item, setItem] = useState(false)
  const [locale, setLocale] = useState('en')
  const dispatch = useDispatch()

  useEffect(() => {
    const _item = createItem(fields, locales)
    setItem(_item)
  }, [])

  function handleChange(e) {
    const { name, locale, value } = e
    item[name][locale] = value
    setItem({ ...item })
  }

  async function handleSave(e) {
    await dispatch(dataListActions.addItem(item))
    onClose()
  }

  function handleCancel() {
    onClose()
  }

  return (
    <>
      <LocaleSelector
        value={locale}
        locales={locales}
        onChange={(loc) => {
          setLocale(loc)
        }}
      />
      <ItemEditor
        fields={fields}
        locale={locale}
        item={item}
        onChange={handleChange}
      />
      <ButtonRow>
        <Button label="Save" color="primary" onClick={handleSave} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </>
  )
}
