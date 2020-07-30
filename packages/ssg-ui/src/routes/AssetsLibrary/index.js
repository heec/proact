import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { useFileDrop } from '../../controls/FileDrop'

const Root = styled.div``

export default function (props) {
  const {} = props
  const { path } = useParams()
  const { isDragActive } = useFileDrop({
    onDrop: function (file) {
      console.log(file)
    },
  })
  return (
    <Root>
      media library {path} <br />
      {isDragActive && <div>drop file here</div>}
    </Root>
  )
}
