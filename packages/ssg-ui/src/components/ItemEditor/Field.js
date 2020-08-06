import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

import String from './String'
import Text from './Text'
import Markdown from './Markdown'
import Boolean from './Boolean'
import Asset from './Asset'
import Float from './Float'
import Integer from './Integer'
import Select from './Select'
import Date from './Date'
import ListRef from './ListRef'
import PageRef from './PageRef'

export default function (props) {
  const { field, value, locale } = props

  switch (field.type) {
    case 'string':
      return <String {...props} />

    case 'text':
      return <Text {...props} />

    case 'markdown':
      return <Markdown {...props} />

    case 'boolean':
      return <Boolean {...props} />

    case 'date':
      return <Date {...props} />

    case 'float':
      return <Float {...props} />

    case 'int':
      return <Integer {...props} />

    case 'asset':
      return <Asset {...props} />

    case 'select':
      return <Select {...props} />

    case 'listRef':
      return <ListRef {...props} />

    case 'pageRef':
      return <PageRef {...props} />

    default:
      throw new Error(`unknown property type: ${field.type}`)
  }
}
