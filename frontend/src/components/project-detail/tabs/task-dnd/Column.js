import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'

import Task from './Task'

const Column = props => {
  const { column, tasks, openTaskDetail } = props

  return (
    <Card style={{ backgroundColor: '#e5e5e5', padding: '8px' }}>
      <Typography>{column.name}</Typography>

      <Droppable droppableId={column._id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '80px' }}
          >
            {tasks.map((task, index) => (
              <Task key={task._id} task={task} index={index} onClick={openTaskDetail} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  )
}

export default Column
