import React from 'react'
import { Chip } from '@material-ui/core'

const Label = props => {
  const { label } = props

  if (!label.name) return null

  return <Chip
    label={label.name}
    style={{ ...props.style }}
  />
}

export default Label
