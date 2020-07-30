import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useContext } from 'react'

import { toList } from '../../utils/toList'
import theme from '../../theme'
import Field from './Field'

const Row = styled.div`
  ${theme.margin(2, 0)}
`

const Label = styled.label`
  font-size: ${theme.fontSize.small};
`

const FormControl = styled.div`
  display: flex;
  border: solid 1px ${theme.colors.greyLight};
  ${theme.margin(0.5, 0)};
  ${theme.padding(0.5)};
  input,
  select,
  textarea {
    flex-basis: 100%;
    border: none;
  }
`

function Property(props) {
  const { field, value, locale, onChange } = props
  const [initialValue, setInitialValue] = useState()

  useEffect(() => {}, [])

  function handleChange(e) {
    const name = field.key
    const { value } = e.target
    onChange({ name, locale, value })
  }

  if (!value) {
    return null
  }

  return (
    <Row>
      <Label>
        {field.label} {field.localize && <span>({locale})</span>}
      </Label>
      <FormControl>
        <Field
          field={field}
          value={value[locale]}
          locale={locale}
          onChange={handleChange}
        />
      </FormControl>
    </Row>
  )
}

export default function (props) {
  const { fields, item, locale, onChange } = props

  return toList(fields).map((field) => (
    <Property
      key={field.key}
      field={field}
      value={item[field.key]}
      locale={field.localize ? locale : '*'}
      onChange={onChange}
    />
  ))
}
