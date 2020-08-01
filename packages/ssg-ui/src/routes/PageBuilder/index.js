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
import theme from '../../theme'
import DeviceSelector from './DeviceSelector'
import Component from './Component'
import PagePreview from './PagePreview'

const SplitContent = styled.div`
  display: flex;
`

const PreviewContainer = styled.div`
  position: fixed;
  top: ${theme.spacing(17)};
  left: ${theme.spacing(2)};
  right: ${theme.spacing(82)};
  bottom: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;
`

const SplitContentRight = styled.div`
  ${theme.padding(2)};
  margin-left: auto;
  width: ${theme.spacing(80)};
`

export default function () {
  const { collectionName, fileName } = useParams()
  const [locale, setLocale] = useState('en')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const { page, locales, pageContent, loaded } = useSelector(
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
      <ToolBar title={page.name} icon={<PageBuilderIcon />}>
        <DeviceSelector
          value={previewDevice}
          onChange={(device) => {
            setPreviewDevice(device)
          }}
        />
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
        <PreviewContainer>
          <PagePreview device={previewDevice} locale={locale} />
        </PreviewContainer>
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
