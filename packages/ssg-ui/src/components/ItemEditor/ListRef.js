import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import theme from '../../theme'
import FormControl from './FormControl'

export default function (props) {
  const { field, value, locale, onChange } = props
  const [listItems, setListItems] = useState([])
  const { lists } = useSelector((state) => state.pageBuilder)

  useEffect(() => {
    const { list, listTextField, localize } = field
    const _list = lists[list]
    if (!lists[list]) {
      throw new Error(`dataList ${list} not exists`)
    }
    const loc = localize ? locale : '*'

    const items = _list.map((item) => ({
      value: item.id,
      name: item[listTextField][loc],
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
