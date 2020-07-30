import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { renderContent } from '../../store/services/pages/renderContent'
import theme from '../../theme'
import IconButton from '../../controls/IconButton'
import ReloadIcon from '../../icons/Reload'

const Root = styled.div`
  background-color: #fff;
  border: solid 1px ${theme.colors.grey};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.spacing(5)};
  ${theme.padding(0, 2)};
  background-color: ${theme.colors.greyLighter};
`
const Content = styled.div`
  iframe {
    display: block;
    height: 600px;
  }
`

function PreviewWindow(props) {
  const { content } = props
  const $iframe = useRef()
  useEffect(() => {
    $iframe.current.contentWindow.document.open()
    $iframe.current.contentWindow.document.write(content)
  }, [content])
  return <iframe ref={$iframe} frameBorder="0" width="100%" sandbox></iframe>
}

export default function (props) {
  const { locale } = props
  const [content, setContent] = useState('')
  const [updating, setUpdating] = useState(false)

  const { pageContent } = useSelector((state) => state.pageBuilder)

  async function handleRenderPage() {
    setUpdating(true)
    const res = await renderContent(pageContent, locale)
    setContent(res.html)
    setUpdating(false)
  }

  useEffect(() => {
    if (!updating) {
      handleRenderPage()
    }
  }, [pageContent])

  return (
    <Root>
      <Header>
        <IconButton icon={<ReloadIcon />} onClick={handleRenderPage} />
      </Header>
      <Content>
        <PreviewWindow content={content} />
      </Content>
    </Root>
  )
}
