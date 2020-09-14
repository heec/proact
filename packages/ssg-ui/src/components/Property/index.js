import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

const Root = styled.div`
  input {
    min-height: 20px;
    min-width: 20px;
  }
`

const ListRefField = function (props) {
  const { field, value, locale } = props
  const { lists } = useSelector((state) => state.app)
  const [listItem, setListItem] = useState()

  useEffect(() => {
    const _listItem = lists[field.list].find(
      (item) => item.id === value[locale]
    )
    setListItem(_listItem)
  }, [])

  if (!listItem) return <Root />

  /*
            lists[field.list].find((item) => item.id === value[loc])[
              field.listTextField
            ][loc]
          */

  return <Root>ref</Root>
}

export default function (props) {
  const { field, value, locale } = props
  const loc = field.localize ? locale : '*'

  const { lists } = useSelector((state) => state.app)

  if (!value || typeof !value[loc] === 'undefined') {
    return null
  }

  let displayValue = ''
  switch (field.type) {
    case 'boolean':
      return (
        <Root>
          <input type="checkbox" readonly checked={Boolean(value[loc])} />
        </Root>
      )
      break
    case 'listRef':
      return <ListRefField field={field} value={value} locale={loc} />
      break
    case 'pageRef':
      return <Root>Page Ref</Root>
      break
    default:
      return <Root>{value[loc]}</Root>
  }
}
