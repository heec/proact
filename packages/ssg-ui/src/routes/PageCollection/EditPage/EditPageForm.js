import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import pageCollectionActions from '../../../store/pageCollection/actions'
import FormRow from '../../../controls/FormRow'
import FormGroup from '../../../controls/FormGroup'
import LocaleSelector from '../../../components/LocaleSelector'
import ItemEditor from '../../../components/ItemEditor'
import Button from '../../../controls/Button'
import ButtonRow from '../../../controls/ButtonRow'

export default function (props) {
  const { page, onClose } = props
  const [name, setName] = useState('')
  const [fileName, setFileName] = useState('')
  const [locale, setLocale] = useState('en')
  const [routes, setRoutes] = useState({})
  const [propsItem, setPropsItem] = useState({})

  const dispatch = useDispatch()
  const { pageCollectionConfiguration } = useSelector(
    (state) => state.pageCollection
  )
  const { locales } = pageCollectionConfiguration

  useEffect(() => {
    if (page) {
      setName(page.name)
      setFileName(page.fileName)
      const _routes = { ...page.routes }
      const _props = JSON.parse(JSON.stringify(page.props))
      setPropsItem(_props)
      setRoutes(_routes)
    }
  }, [page])

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

  function handlePropsChange(e) {
    const { name, locale, value } = e
    propsItem[name][locale] = value
    setPropsItem({ ...propsItem })
  }

  async function handleSave() {
    const _page = await dispatch(pageCollectionActions.getPage(fileName))

    const _routes = {}
    Object.keys(routes).forEach((r) => {
      const route = routes[r]
      if (typeof route === 'string' && route.length > 0) {
        _routes[r] = route
      }
    })
    _page.name = name
    _page.locales = Object.keys(_routes)
    _page.routes = _routes
    _page.props = propsItem
    await dispatch(pageCollectionActions.updatePage(_page))
    onClose()
  }

  function handleCancel() {
    onClose()
  }
  return (
    <>
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
            <code>{fileName}</code>
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
    </>
  )
}
