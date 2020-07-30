import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import theme from '../../theme'
import AssetesIcon from '../../icons/Assetes'
import PagesIcon from '../../icons/Pages'
import DataIcon from '../../icons/Data'

const Navigation = styled.aside`
  position: fixed;
  top: ${theme.spacing(7)};
  left: 0;
  bottom: 0;
  width: ${theme.spacing(32)};
  padding-top: ${theme.spacing(5)};
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  background-color: #ffffff;
  border-right: solid 1px ${theme.colors.greyLight};
  overflow-y: auto;
`

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${theme.spacing(5)};
  color: ${theme.colors.greyDarker};
  font-weight: 600;
  padding: 0 ${theme.spacing(2)};
  color: ${theme.colors.greyDark};
  .icon {
    margin-right: ${theme.spacing(1)};
  }
`

const NavList = styled.div`
  border-top: solid 1px ${theme.colors.greyLight};
  border-bottom: solid 1px ${theme.colors.greyLight};
  margin-bottom: ${theme.spacing(4)};
  a {
    display: flex;
    align-items: center;
    height: ${theme.spacing(5)};
    padding: 0 ${theme.spacing(2)};
    color: ${theme.colors.greyDarker};

    &:hover {
      background-color: ${theme.colors.greyLighter};
    }
    &.selected {
      background-color: ${theme.colors.greyLight};
    }
  }
`

export default function () {
  const { configuration } = useSelector((state) => state.app)
  const { pages, lists } = configuration
  return (
    <Navigation>
      <NavHeader>
        <span>Pages</span>
      </NavHeader>

      <NavList>
        {Object.keys(pages).map((collection) => (
          <NavLink
            key={collection}
            to={`/pages/${collection}`}
            activeClassName="selected"
          >
            {pages[collection].label}
          </NavLink>
        ))}
      </NavList>

      <NavHeader>
        <span>Data Lists</span>
      </NavHeader>

      <NavList>
        {Object.keys(lists).map((listName) => (
          <NavLink
            key={listName}
            to={`/dataList/${listName}`}
            activeClassName="selected"
          >
            {lists[listName].label}
          </NavLink>
        ))}
      </NavList>

      <NavHeader>
        <span>Assets</span>
      </NavHeader>

      <NavList>
        <NavLink to="/assets/" exact activeClassName="selected">
          /
        </NavLink>
        <NavLink to="/assets/images" exact activeClassName="selected">
          /images
        </NavLink>
      </NavList>
    </Navigation>
  )
}
