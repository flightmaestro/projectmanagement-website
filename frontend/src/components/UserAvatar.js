import React from 'react'
import { Avatar, Tooltip } from '@material-ui/core'
import ColorHash from 'color-hash'

const colorHash = new ColorHash()

const UserAvatar = props => {
  if (!props.user) return null

  const { _id, name } = props.user

  if (!_id || !name) return null

  const style = {
    color: '#fff',
    backgroundColor: colorHash.hex(_id),
    ...props.style
  }

  const getInitials = () => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
  }

  return (
    <Tooltip title={name}>
      <Avatar style={style}>{getInitials()}</Avatar>
    </Tooltip>
  )
}

export default UserAvatar
