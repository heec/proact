import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: ${theme.spacing(5)};
  border-radius: ${theme.spacing(0.5)};
  cursor: pointer;
  ${theme.padding(0, 3)}

  &:active {
    ${theme.elevate(1)}
  }

  &:hover {
    ${theme.elevate(1)}
  }

  &:focus {
    ${theme.elevate(1)}
  }

  span {
    ${theme.margin(0, 1)}
  }
  &.primary {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.primaryContrast};
  }
  &.secondary {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.secondaryContrast};
  }
`

export default function (props) {
  const {
    label,
    startIcon,
    endIcon,
    color,
    variant,
    type,
    disabled,
    onClick,
  } = props

  const classes = []
  if (color) {
    classes.push(color)
  }

  if (variant) {
    classes.push(variant)
  }

  return (
    <Button
      disabled={disabled}
      className={classes.join(' ')}
      type={type || 'button'}
      onClick={onClick}
    >
      {startIcon && startIcon}
      <span>{label}</span>
      {endIcon && endIcon}
    </Button>
  )
}
