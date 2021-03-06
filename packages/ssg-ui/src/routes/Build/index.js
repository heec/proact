import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { buildAllPages } from '../../store/services/pages/buildAllPages'
import ToolBar from '../../components/ToolBar'
import Button from '../../controls/Button'
import Loader from '../../controls/Loader'

const Root = styled.div``

export default function (props) {
  const {} = props
  const [buildPending, setBuildPending] = useState(false)
  const [buildResult, setBuildResult] = useState(undefined)
  const [buildFailed, setBuildFailed] = useState(undefined)

  async function startBuild() {
    setBuildPending(true)
    setBuildResult(undefined)
    setBuildFailed(undefined)

    try {
      const res = await buildAllPages()
      setBuildResult(res)
    } catch (err) {
      setBuildFailed(err)
      console.log(err)
    }
    setBuildPending(false)
  }

  return (
    <Root>
      <ToolBar>
        <Button
          label="Start Build"
          variant="primary"
          onClick={startBuild}
        ></Button>
      </ToolBar>
      {buildPending ? (
        <Loader />
      ) : (
        <div>
          {buildFailed && <pre>failed</pre>}
          {buildResult && (
            <pre>{JSON.stringify(buildResult, undefined, 2)}</pre>
          )}
        </div>
      )}
    </Root>
  )
}
