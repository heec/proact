import React, { useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import pageCollectionActions from '../../store/pageCollection/actions'
import ToolBar from '../../components/ToolBar'
import PageContent from '../../components/PageContent'
import Paper from '../../controls/Paper'
import Loader from '../../controls/Loader'
import IconButton from '../../controls/IconButton'
import PagesIcon from '../../icons/Pages'
import PageBuilderIcon from '../../icons/PageBuilder'
import CreatePage from './CreatePage'
import DeletePage from './DeletePage'
import EditPage from './EditPage'

const Actions = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
`

export default function () {
  const { collectionName } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { pageCollectionConfiguration, items, loaded } = useSelector(
    (state) => state.pageCollection
  )

  useEffect(() => {
    async function loadPageCollection(collectionName) {
      await dispatch(pageCollectionActions.loadPageCollection(collectionName))
    }
    if (collectionName) {
      loadPageCollection(collectionName)
    }
    return function () {
      dispatch(pageCollectionActions.unloadPageCollection())
    }
  }, [collectionName])

  if (!loaded) {
    return <Loader />
  }

  function openPageBuilder(page) {
    history.push(`./${collectionName}/${page.fileName.replace('.json', '')}`)
  }

  return (
    <>
      <ToolBar title={pageCollectionConfiguration.label} icon={<PagesIcon />}>
        <CreatePage />
      </ToolBar>
      <PageContent>
        <Paper>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>File Name</th>
                <th>Routes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.fileName}>
                  <td>{item.name}</td>
                  <td>{item.fileName}</td>
                  <td>
                    {Object.keys(item.routes).map((loc) => (
                      <div key={loc}>
                        <strong>{loc}:</strong> {item.routes[loc]}
                      </div>
                    ))}
                  </td>
                  <td>
                    <Actions>
                      <EditPage page={item} />
                      <IconButton
                        icon={<PageBuilderIcon />}
                        onClick={() => {
                          openPageBuilder(item)
                        }}
                      />
                      <DeletePage page={item} />
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
