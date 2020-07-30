import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import IconButton from '../../controls/IconButton'
import AddIcon from '../../icons/Plus'
import theme from '../../theme'
import Component from './Component'

const Root = styled.div`
  border: dashed 2px ${theme.colors.greyLight};
  ${theme.margin(2, 1)};
  ${theme.padding(0, 1)};
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  background-color: #fff;
  ${theme.elevate(2)};
  min-width: 200px;
  transform: translateX(calc(-50% + 20px));
`

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  border: none;
  white-space: nowrap;
  background-color: transparent;
  height: ${theme.spacing(5)};
  ${theme.padding(1, 2)};
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.secondaryContrast};
  }
`

const PickerRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.margin(1, 0)};
  height: ${theme.spacing(3)};
  > div {
    display: none;
    position: relative;
  }
  &:hover {
    > div {
      display: block;
    }
  }
  &.drop-target {
    border: dashed 1px ${theme.colors.secondary};
  }
`

function ComponentPicker(props) {
  const { components, index, onAddComponent, onComponentDroped } = props
  const [open, setOpen] = useState(false)
  const [dropTarget, setDropTarget] = useState(false)
  const $rootElm = useRef()

  const closeMenu = () => {
    setOpen(false)
    document.removeEventListener('click', closeMenu)
  }

  useEffect(() => {
    const handleDragOver = (e) => {
      const allowDrop = components.find(
        (c) => c.componentId === window._dragelm.componentId
      )
      if (allowDrop) {
        e.preventDefault()
      }
    }
    const handleDragEnter = (e) => {
      const allowDrop = components.find(
        (c) => c.componentId === window._dragelm.componentId
      )
      if (allowDrop) {
        setDropTarget(true)
      }
    }
    const handleDragLeave = (e) => {
      setDropTarget(false)
    }
    const handleDrop = (e) => {
      const allowDrop = components.find(
        (c) => c.componentId === window._dragelm.componentId
      )
      if (allowDrop) {
        onComponentDroped(window._dragelm, index)
      }

      setDropTarget(false)
    }
    $rootElm.current.addEventListener('dragover', handleDragOver)
    $rootElm.current.addEventListener('dragenter', handleDragEnter)
    $rootElm.current.addEventListener('dragleave', handleDragLeave)
    $rootElm.current.addEventListener('drop', handleDrop)
    return () => {
      $rootElm.current.removeEventListener('dragover', handleDragOver)
      $rootElm.current.removeEventListener('dragenter', handleDragEnter)
      $rootElm.current.removeEventListener('dragleave', handleDragLeave)
      $rootElm.current.removeEventListener('drop', handleDrop)
    }
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [components])

  const toggleMenu = () => {
    const addCloseListener = !open
    setOpen(!open)
    if (addCloseListener) {
      setTimeout(() => {
        document.addEventListener('click', closeMenu)
      }, 10)
    } else {
      document.removeEventListener('click', closeMenu)
    }
  }

  function handleAddComponent(componentId, index) {
    onAddComponent(componentId, index)
  }

  return (
    <PickerRoot
      ref={$rootElm}
      className={dropTarget ? 'drop-target' : undefined}
    >
      <div>
        <IconButton icon={<AddIcon />} onClick={toggleMenu} />
        {open && (
          <Menu>
            {components.map((componentDef, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  handleAddComponent(componentDef.componentId, index)
                }}
              >
                {componentDef.label}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    </PickerRoot>
  )
}

export default function (props) {
  const {
    parentComponent,
    components,
    locale,
    onAddComponent,
    onMoveComponent,
  } = props
  const [allowedChildComponents, setAllowedChildComponents] = useState([])

  const { configuration } = useSelector((state) => state.app)

  useEffect(() => {
    const compDef = configuration.components[parentComponent.componentId]
    const _allowedChildComponents = compDef.children.map((componentId) => ({
      ...configuration.components[componentId],
      componentId,
    }))
    setAllowedChildComponents(_allowedChildComponents)
  }, [parentComponent.componentId])

  function handleMoveComponent(source, index) {
    onMoveComponent(source, {
      id: parentComponent.id,
      index,
    })
  }

  if (allowedChildComponents.length < 1) {
    return null
  }

  return (
    <Root>
      {components.map((child, index) => (
        <React.Fragment key={child.id}>
          <ComponentPicker
            components={allowedChildComponents}
            index={index}
            onAddComponent={onAddComponent}
            onComponentDroped={handleMoveComponent}
          />
          <Component
            component={child}
            parentComponent={parentComponent}
            locale={locale}
          />
        </React.Fragment>
      ))}
      <ComponentPicker
        components={allowedChildComponents}
        index={components.length}
        onAddComponent={onAddComponent}
        onComponentDroped={handleMoveComponent}
      />
    </Root>
  )
}
