import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import theme from '../../theme'

const Tab = styled.li`
  margin: 0;
  padding: ${theme.spacing(0.5)} ${theme.spacing(2)};
  color: ${theme.colors.greyDark};
  border-top-left-radius: ${theme.spacing(0.5)};
  border-top-right-radius: ${theme.spacing(0.5)};

  &.selected {
    color: ${theme.colors.secondaryContrast};
    background-color: ${theme.colors.secondary};
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: inherit;
  }
`

export default function (props) {
  const { active, label, onTabClick, tabIndex } = props
  return (
    <Tab className={active ? 'selected' : ''}>
      <button
        type="button"
        onClick={() => {
          if (onTabClick) {
            onTabClick(tabIndex)
          }
        }}
      >
        {label}
      </button>
    </Tab>
  )
}
