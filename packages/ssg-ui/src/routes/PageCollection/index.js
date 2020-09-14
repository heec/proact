import React, { useEffect, useState } from 'react'
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
import Property from '../../components/Property'
import LocaleSelector from '../../components/LocaleSelector'
import theme from '../../theme'
import CreatePage from './CreatePage'
import DeletePage from './DeletePage'
import EditPage from './EditPage'

const Actions = styled.div`
  display: flex;
  button {
    margin-right: 16px;
  }
`

const LocaleRoutes = styled.div`
  span {
    display: inline-block;
    margin-right: 12px;
  }
`

const LinkList = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ul {
      display: block;
    }
  }
  ul {
    position: absolute;
    display: none;
    list-style: none;
    padding: 8px 16px;
    margin: 0;
    background-color: #fff;
    z-index: 2;
    ${theme.elevate(1)}
  }
  li {
    padding: 4px 0;
    margin: 0;
    margin-right: 12px;
    white-space: nowrap;
  }
`

export default function () {
  const { collectionName } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [propColumns, setPropColumns] = useState([])
  const [locale, setLocale] = useState('en')
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

  useEffect(() => {
    if (pageCollectionConfiguration && pageCollectionConfiguration.props) {
      const _propColumns = []
      Object.keys(pageCollectionConfiguration.props).forEach((prop) => {
        if (pageCollectionConfiguration.props[prop].showInList) {
          _propColumns.push({
            key: prop,
            ...pageCollectionConfiguration.props[prop],
          })
        }
      })
      setPropColumns(_propColumns)
    }
  }, [pageCollectionConfiguration])

  if (!loaded) {
    return <Loader />
  }

  function openPageBuilder(page) {
    history.push(`./${collectionName}/${page.fileName.replace('.json', '')}`)
  }

  return (
    <>
      <ToolBar title={pageCollectionConfiguration.label} icon={<PagesIcon />}>
        <LocaleSelector
          locales={pageCollectionConfiguration.locales}
          value={locale}
          onChange={(loc) => {
            setLocale(loc)
          }}
        />
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
                {propColumns.map((prop) => (
                  <th key={prop.key}>{prop.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.fileName}>
                  <td>{item.name}</td>
                  <td>{item.fileName}</td>
                  <td>
                    <LinkList>
                      <LocaleRoutes>
                        {Object.keys(item.routes).map((loc) => (
                          <span key={loc}>{loc}</span>
                        ))}
                      </LocaleRoutes>
                      <ul>
                        {Object.keys(item.routes).map((loc) => (
                          <li key={loc}>
                            <strong>{loc}: </strong>
                            <a href={item.routes[loc]} target="_blank">
                              {item.routes[loc]}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </LinkList>
                  </td>
                  {propColumns.map((prop) => (
                    <td key={prop.key}>
                      <Property
                        field={prop}
                        value={item.props[prop.key]}
                        locale={locale}
                      />
                    </td>
                  ))}
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
