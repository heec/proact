import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { renderContent } from '../../store/services/pages/renderContent'
import theme from '../../theme'
import IconButton from '../../controls/IconButton'
import ReloadIcon from '../../icons/Reload'

const Root = styled.div`
  &.desktop {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border: solid 1px ${theme.colors.grey};
    .screen {
      width: 100%;
      height: 100%;
    }
  }
  &.tablet,
  &.mobile {
    ${theme.elevate(2)};
    border-radius: ${theme.spacing(4)};
    background-color: #222;
    border: solid 4px ${theme.colors.greyDark};
    ${theme.padding(4, 2)};
    .screen {
      background-color: #fff;
    }
  }
  &.tablet {
    .screen {
      height: 1024px;
      width: 768px;
    }
  }
  &.mobile {
    .screen {
      height: 667px;
      width: 375px;
    }
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.spacing(5)};
  ${theme.padding(0, 2)};
  background-color: ${theme.colors.greyLighter};
  border-bottom: solid 1px ${theme.colors.grey};
`
const Content = styled.div`
  height: calc(100% - ${theme.spacing(5)});
  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
`

function PreviewWindow(props) {
  const { content } = props
  const $iframe = useRef()
  useEffect(() => {
    $iframe.current.contentWindow.document.open()
    $iframe.current.contentWindow.document.write(content)
  }, [content])
  return <iframe ref={$iframe} frameBorder="0" width="100%"></iframe>
}

export default function (props) {
  const { locale, device } = props
  const [content, setContent] = useState('')
  const [updating, setUpdating] = useState(false)

  const { page, pageContent } = useSelector((state) => state.pageBuilder)

  async function handleRenderPage() {
    setUpdating(true)
    const res = await renderContent({ ...page, content: pageContent }, locale)
    setContent(res.html)
    setUpdating(false)
  }

  useEffect(() => {
    if (!updating) {
      handleRenderPage()
    }
  }, [pageContent])

  return (
    <Root className={device}>
      <div className="screen">
        <Header>
          <IconButton icon={<ReloadIcon />} onClick={handleRenderPage} />
        </Header>
        <Content>
          <PreviewWindow content={content} />
        </Content>
      </div>
    </Root>
  )
}
