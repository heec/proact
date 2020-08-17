import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import pageCollectionActions from '../../../store/pageCollection/actions'
import FormRow from '../../../controls/FormRow'
import FormGroup from '../../../controls/FormGroup'
import { createItem } from '../../../utils/createItem'
import LocaleSelector from '../../../components/LocaleSelector'
import ItemEditor from '../../../components/ItemEditor'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'

const Root = styled.div``

export default function (props) {
  const { onClose } = props
  const [name, setName] = useState('')
  const [fileName, setFileName] = useState('')
  const [propsItem, setPropsItem] = useState({})
  const [locale, setLocale] = useState('en')
  const [routes, setRoutes] = useState({})

  const dispatch = useDispatch()
  const { pageCollectionConfiguration } = useSelector(
    (state) => state.pageCollection
  )

  const { locales } = pageCollectionConfiguration

  useEffect(() => {
    const _item = createItem(pageCollectionConfiguration.props, locales)
    setPropsItem(_item)
  }, [])

  function handleUpdate(e) {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
    } else if (name === 'fileName') {
      setFileName(value)
    }
  }

  function handlePropsChange(e) {
    const { name, locale, value } = e
    propsItem[name][locale] = value
    setPropsItem({ ...propsItem })
  }

  function handleUpdateRoute(e) {
    const { name, value } = e.target
    setRoutes({ ...routes, [name]: value })
  }

  async function handleSave() {
    const page = {
      name,
      fileName: `${fileName}.json`,
      props: propsItem,
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
        <LocaleSelector
          value={locale}
          locales={locales}
          onChange={(loc) => {
            setLocale(loc)
          }}
        />
        <FormGroup title="Filename">
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
        </FormGroup>
        <FormGroup title="Properties">
          <ItemEditor
            fields={pageCollectionConfiguration.props}
            locale={locale}
            item={propsItem}
            onChange={handlePropsChange}
          />
        </FormGroup>
        <FormGroup title="Routes">
          {locales.map((locale) => (
            <FormRow key={locale} label={locale} inline>
              <input
                type="text"
                value={routes[locale]}
                name={locale}
                onChange={handleUpdateRoute}
                autoComplete="off"
              />
            </FormRow>
          ))}
        </FormGroup>
      </form>
      <ButtonRow>
        <Button label="Save" color="primary" onClick={handleSave} />
        <Button label="Cancel" onClick={handleCancel} />
      </ButtonRow>
    </Root>
  )
}
