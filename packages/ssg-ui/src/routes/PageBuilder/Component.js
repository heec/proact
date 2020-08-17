import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import pageBuilderActions from '../../store/pageBuilder/actions'
import Collapsible from '../../controls/Collapsible'
import IconButton from '../../controls/IconButton'
import ChevronDownIcon from '../../icons/ChevronDown'
import ChevronUpIcon from '../../icons/ChevronUp'
import theme from '../../theme'
import ItemEditor from '../../components/ItemEditor'
import ComponentList from './ComponentList'
import DeleteItem from './DeleteItem'

const Root = styled.div`
  border: solid 1px ${theme.colors.grey};
  background-color: #fff;
  margin: 0;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.greyLighter};
  padding: 0 0 0 16px;
  h4 {
    margin: 0;
  }
  > div {
    display: flex;
    align-items: center;
  }
`

const Seperator = styled.div`
  margin: 0 ${theme.spacing(1)};
  width: 1;
  height: ${theme.spacing(3)};
  border-left: 1px solid ${theme.colors.greyDark};
`

const Editor = styled.div`
  padding: 16px;
`

const Draggable = styled.div`
  cursor: move;
`

function DragHandle(props) {
  const { data, children } = props
  const $dragHandle = useRef()

  useEffect(() => {
    const handleDragStart = (e) => {
      window._dragelm = data
      e.dataTransfer.setData('text/plain', JSON.stringify(data))
    }
    const handleDragEnd = (e) => {
      delete window._dragelm
    }
    $dragHandle.current.addEventListener('dragstart', handleDragStart)
    $dragHandle.current.addEventListener('dragend', handleDragEnd)
    return () => {
      $dragHandle.current.removeEventListener('dragstart', handleDragStart)
      $dragHandle.current.removeEventListener('dragend', handleDragEnd)
    }
  }, [])

  return (
    <Draggable draggable ref={$dragHandle}>
      {children}
    </Draggable>
  )
}

function Component(props) {
  const { component, parentComponent, locale } = props
  const [showEditor, setShowEditor] = useState(false)
  const [componentDef, setComponentDef] = useState({})
  const dispatch = useDispatch()
  const { configuration } = useSelector((state) => state.app)

  useEffect(() => {
    if (!configuration.components[component.componentId]) {
      throw new Error(`unknown component ${component.componentId}`)
    }
    const _componentDef = configuration.components[component.componentId]
    setComponentDef(_componentDef)
  }, [])

  function handleChange(e) {
    dispatch(
      pageBuilderActions.handleChange(component.id, e.name, e.locale, e.value)
    )
  }

  function handleToggleEditor() {
    setShowEditor(!showEditor)
  }

  function handleAddComponent(componentId, index) {
    dispatch(pageBuilderActions.addComponent(component.id, componentId, index))
  }

  function handleMoveComponent(source, target) {
    dispatch(pageBuilderActions.moveComponent(source, target))
  }

  if (!componentDef.props) {
    return null
  }

  return (
    <Root>
      <Header>
        {parentComponent ? (
          <DragHandle
            data={{
              id: component.id,
              componentId: component.componentId,
              parentId: parentComponent.id,
            }}
          >
            {componentDef.label}
          </DragHandle>
        ) : (
          <h4>{componentDef.label}</h4>
        )}
        <div>
          {parentComponent && (
            <DeleteItem
              component={component}
              parentComponent={parentComponent}
            />
          )}
          <Seperator />
          <IconButton
            icon={showEditor ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggleEditor}
          />
        </div>
      </Header>
      <Collapsible open={showEditor}>
        <Editor>
          <ItemEditor
            fields={componentDef.props}
            locale={locale}
            item={component.props}
            onChange={handleChange}
          />
        </Editor>
      </Collapsible>
      {component.children && (
        <ComponentList
          parentComponentId={component.componentId}
          parentComponent={component}
          components={component.children}
          locale={locale}
          onAddComponent={handleAddComponent}
          onMoveComponent={handleMoveComponent}
        />
      )}
    </Root>
  )
}

export default Component
