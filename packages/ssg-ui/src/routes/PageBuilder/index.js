import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import pageBuilderActions from '../../store/pageBuilder/actions'
import ToolBar from '../../components/ToolBar'
import Button from '../../controls/Button'
import Loader from '../../controls/Loader'
import LocaleSelector from '../../components/LocaleSelector'
import PageBuilderIcon from '../../icons/PageBuilder'
import Component from './Component'
import PagePreview from './PagePreview'

const SplitContent = styled.div`
  display: flex;
`

const SplitContentLeft = styled.div`
  padding: 20px;
  flex-grow: 1;
`

const SplitContentRight = styled.div`
  padding: 20px;
  flex-basis: 640px;
`

export default function () {
  const { collectionName, fileName } = useParams()
  const [locale, setLocale] = useState('en')
  const { name, locales, pageContent, loaded } = useSelector(
    (state) => state.pageBuilder
  )
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadPage() {
      await dispatch(pageBuilderActions.loadPage(collectionName, fileName))
    }
    if (collectionName && fileName) {
      loadPage()
    }
    return function () {
      dispatch(pageBuilderActions.unloadPage())
    }
  }, [collectionName, fileName])

  function handleSave() {
    dispatch(pageBuilderActions.updatePageContent())
  }

  if (!loaded) {
    return <Loader />
  }

  return (
    <>
      <ToolBar title={name} icon={<PageBuilderIcon />}>
        <LocaleSelector
          locales={locales}
          value={locale}
          onChange={(loc) => {
            setLocale(loc)
          }}
        />
        {/* {<Button label="Restore" />} */}
        <Button label="Save" onClick={handleSave} />
      </ToolBar>
      <SplitContent>
        <SplitContentLeft>
          <PagePreview locale={locale} />
        </SplitContentLeft>
        <SplitContentRight>
          <Component
            component={pageContent}
            locale={locale}
            parentComponent={null}
          />
        </SplitContentRight>
      </SplitContent>
    </>
  )
}
