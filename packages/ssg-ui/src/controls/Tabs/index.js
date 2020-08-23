import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import theme from '../../theme'

const TabList = styled.ul`
  list-style: none;
  display: flex;
  margin: ${theme.spacing(2)} 0;
  padding: 0 ${theme.spacing(1)};
  border-bottom: solid 1px ${theme.colors.secondary};
`

export default function (props) {
  const { children } = props

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  function handleTabClick(tabIndex) {
    setActiveTabIndex(tabIndex)
  }

  return (
    <div>
      <TabList>
        {React.Children.map(children, (child, index) => {
          if (child) {
            return React.cloneElement(child, {
              label: child.props.label,
              onTabClick: handleTabClick,
              tabIndex: index,
              active: index === activeTabIndex,
            })
          }
        })}
      </TabList>
      {children[activeTabIndex] && (
        <div>{children[activeTabIndex].props.children}</div>
      )}
    </div>
  )
}
