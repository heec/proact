import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import dataListActions from '../../../store/dataList/actions'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'
import LocaleSelector from '../../../components/LocaleSelector'
import ItemEditor from '../../../components/ItemEditor'

const Root = styled.div``

export default function (props) {
  const { item, fields, locales, onClose } = props
  const [locale, setLocale] = useState('en')
  const [editItem, setEditItem] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    const _item = JSON.parse(JSON.stringify(item))
    setEditItem(_item)
  }, [item])

  function handleChange(e) {
    const { name, locale, value } = e
    editItem[name][locale] = value
    setEditItem({ ...editItem })
  }

  async function handleSave(e) {
    await dispatch(dataListActions.updateItem(editItem))
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
        item={editItem}
        onChange={handleChange}
      />
      <ButtonRow>
        <Button label="Save" color="primary" onClick={handleSave} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </>
  )
}
