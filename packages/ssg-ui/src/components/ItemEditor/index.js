import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useContext } from 'react'

import { toList } from '../../utils/toList'
import theme from '../../theme'
import Field from './Field'

const Row = styled.div`
  ${theme.margin(2.5, 0)}
`

const Label = styled.label`
  font-size: ${theme.fontSize.small};
  font-weight: 600;
`

const Locale = styled.span`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.greyDark};
`

const FormLabel = styled.div`
  /* 
  display: flex;
  justify-content: space-between; 
  align-items: center;
  */
  ${theme.margin(0.5, 0)}
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
      <FormLabel>
        <Label>{field.label}</Label>
        {!field.localize && <Locale> (all locales)</Locale>}
        {/*field.localize && (
          <Locale>
            Locale: <strong>{locale}</strong>
          </Locale>
        )*/}
      </FormLabel>
      <Field
        field={field}
        value={value[locale]}
        locale={locale}
        onChange={handleChange}
      />
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
