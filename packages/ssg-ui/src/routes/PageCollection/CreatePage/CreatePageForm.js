import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import pageCollectionActions from '../../../store/pageCollection/actions'
import FormRow from '../../../controls/FormRow'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'

const Root = styled.div``

export default function (props) {
  const { onClose } = props
  const [name, setName] = useState('')
  const [fileName, setFileName] = useState('')
  const [routes, setRoutes] = useState({})

  const dispatch = useDispatch()
  const { pageCollectionConfiguration } = useSelector(
    (state) => state.pageCollection
  )

  const { locales } = pageCollectionConfiguration

  function handleUpdate(e) {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
    } else if (name === 'fileName') {
      setFileName(value)
    }
  }

  function handleUpdateRoute(e) {
    const { name, value } = e.target
    setRoutes({ ...routes, [name]: value })
  }

  async function handleSave() {
    const page = {
      name,
      fileName: `${fileName}.json`,
      routes,
    }
    await dispatch(pageCollectionActions.createPage(page))
    onClose()
  }

  function handleCancel() {
    onClose()
  }

  return (
    <Root>
      <form>
        <FormRow label="Name">
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleUpdate}
            autoComplete="off"
          />
        </FormRow>
        <FormRow label="File Name">
          <input
            type="text"
            value={fileName}
            name="fileName"
            onChange={handleUpdate}
            autoComplete="off"
          />
          <code>.json</code>
        </FormRow>
        <h4>Routes</h4>
        {locales.map((locale) => (
          <FormRow key={locale} label={locale}>
            <input
              type="text"
              value={routes[locale]}
              name={locale}
              onChange={handleUpdateRoute}
              autoComplete="off"
            />
          </FormRow>
        ))}
      </form>
      <ButtonRow>
        <Button label="Save" color="primary" onClick={handleSave} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </Root>
  )
}
