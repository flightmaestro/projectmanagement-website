import React, { useState, useEffect } from 'react'
import {
  Card,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core'

import moment from 'moment'

import { getTasks } from '../../apis/tasks'
import UserAvatar from '../UserAvatar'

const TaskList = props => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks({ userId: '5cd49d32c158353a6c7d7ff1' })
      .then(_tasks => setTasks(_tasks))
      .catch(console.log)
  }, [])

  return (
    <Card>
      <List
        subheader={<ListSubheader>Görevlerim ({tasks.length})</ListSubheader>}
      >
        {tasks.map(task => (
          <ListItem
            key={task._id}
            onClick={() => props.openTaskDetail(task._id)}
            button
          >
            <ListItemAvatar>
              <UserAvatar user={task.createdBy} />
            </ListItemAvatar>

            <ListItemText
              primary={task.name}
              secondary={moment(task.endDate).format('D MMM')}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default TaskList
