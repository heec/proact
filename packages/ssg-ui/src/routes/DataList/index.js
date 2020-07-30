import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'

import { toList } from '../../utils/toList'
import dataListActions from '../../store/dataList/actions'
import ToolBar from '../../components/ToolBar'
import PageContent from '../../components/PageContent'
import LocaleSelector from '../../components/LocaleSelector'
import Property from '../../components/Property'
import Loader from '../../controls/Loader'
import Paper from '../../controls/Paper'
import DataIcon from '../../icons/Data'
import AddListItem from './AddListItem'
import EditListItem from './EditListItem'
import DeleteListItem from './DeleteListItem'

const Actions = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
`

export default function (props) {
  const {} = props
  const { listName } = useParams()
  const [locale, setLocale] = useState('en')
  const { listConfiguration, items, loaded } = useSelector(
    (state) => state.dataList
  )
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadList(listName) {
      await dispatch(dataListActions.loadList(listName))
    }
    if (listName) {
      loadList(listName)
    }
    return function () {
      dispatch(dataListActions.unloadList())
    }
  }, [listName])

  if (!loaded) {
    return <Loader />
  }

  const { locales } = listConfiguration
  const fields = listConfiguration.props

  return (
    <>
      <ToolBar title={listConfiguration.label} icon={<DataIcon />}>
        <LocaleSelector
          locales={locales}
          value={locale}
          onChange={(loc) => {
            setLocale(loc)
          }}
        />
        <AddListItem fields={fields} locales={locales} />
      </ToolBar>
      <PageContent>
        <Paper>
          <table>
            <thead>
              <tr>
                {toList(fields).map((field) => (
                  <th key={field.key}>{field.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {toList(fields).map((field) => (
                    <td key={field.key}>
                      <Property
                        field={field}
                        value={item[field.key]}
                        locale={locale}
                      />
                    </td>
                  ))}
                  <td>
                    <Actions>
                      <EditListItem
                        item={item}
                        fields={fields}
                        locales={locales}
                      />
                      <DeleteListItem item={item} />
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </PageContent>
    </>
  )
}
