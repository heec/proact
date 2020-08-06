import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import theme from '../../theme'
import FormControl from './FormControl'

export default function (props) {
  const { field, value, locale, onChange } = props
  const [listItems, setListItems] = useState([])
  const { pageCollections } = useSelector((state) => state.pageBuilder)

  useEffect(() => {
    const { pageCollection, localize } = field
    const _list = pageCollections[pageCollection]
    if (!pageCollections[pageCollection]) {
      throw new Error(`Page Collection ${pageCollection} not exists`)
    }
    const loc = localize ? locale : '*'

    const items = _list.map((item) => ({
      value: `${pageCollection}/${item.fileName}`,
      name: item.name,
    }))
    setListItems(items)
  }, [field])

  function handleOnChange(e) {
    if (field.multiple) {
      onChange({
        target: {
          value: Array.from(e.target.selectedOptions).map(
            (option) => option.value
          ),
        },
      })
    } else {
      onChange(e)
    }
  }

  return (
    <FormControl>
      <select
        value={value}
        multiple={Boolean(field.multiple)}
        onChange={handleOnChange}
      >
        {listItems.map((listItem) => (
          <option key={listItem.value} value={listItem.value}>
            {listItem.name}
          </option>
        ))}
        {!Boolean(field.multiple) && !value && (
          <option value="">Please select</option>
        )}
      </select>
    </FormControl>
  )
}
