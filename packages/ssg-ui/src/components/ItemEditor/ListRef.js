import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import theme from '../../theme'

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

  return (
    <select value={value} onChange={onChange}>
      {listItems.map((listItem) => (
        <option key={listItem.value} value={listItem.value}>
          {listItem.name}
        </option>
      ))}
      {!value && <option value="">Please select</option>}
    </select>
  )
}
