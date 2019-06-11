import React from 'react'
import { Card, Typography, Tooltip, Avatar } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import UserAvatar from '../../../UserAvatar'
import moment from 'moment'

const Task = props => {
  const { task, index, onClick } = props

  const renderUsers = users => {
    if (!users) return null

    let others = []

    const avatars = users.map((user, index) => {
      if (index >= 2) {
        others.push(user.name)
        return null
      }

      return <UserAvatar user={user} style={{ height: '30px', width: '30px', fontSize: 14, marginRight: '2px' }} />
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        {avatars}
        
        {others.length !== 0 && (
          <Tooltip title={others.join(', ')}>
            <Avatar style={{ height: '30px', width: '30px', fontSize: 14 }}>
              +{others.length}
            </Avatar>
          </Tooltip>
        )}
      </div>
    )
  }

  return (
    <Draggable draggableId={task._id} index={index}>
      {provided => (
        <div
          key={task._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={{ cursor: 'pointer', marginTop: '8px' }} onClick={() => onClick(task._id)}>
            <div style={{padding: '8px'}}>
              <Typography>{task.name}</Typography>
              <Typography>{task.detail}</Typography>
            

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <div>
                  <Typography>{moment(task.endDate).format('D MMM')}</Typography>
                  <Typography variant="caption">Teslim Tarihi</Typography>
                </div>

                {renderUsers(task.assignees)}
              </div>

            </div>

            <div style={{ 
              width: `${task.progress}%`, 
              backgroundColor: '#3F51B5',
              height: '4px',
              borderBottomLeftRadius: '2px',
              borderBottomRightRadius: task.progress === 100 ? '2px' : '0px' }} />
          </Card>
          
        </div>
      )}
    </Draggable>
  )
}

export default Task
