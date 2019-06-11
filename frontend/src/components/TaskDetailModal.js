import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  IconButton,
  Typography
} from '@material-ui/core'

import { Create as EditIcon } from '@material-ui/icons'

import UserAvatar from './UserAvatar'
import Label from './Label'

import moment from 'moment'
import { timeDiff } from '../utils'

import { getTaskById } from '../apis/tasks'
import { getEvents } from '../apis/events'

const TaskDetailModal = props => {
  const { open, taskId, taskStatuses, handleClose } = props
  const [task, setTask] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId)
        .then(result => setTask(result))
        .catch(console.log)

      getEvents({ taskId })
        .then(_events => setEvents(_events))
        .catch(console.log)
    }
  }, [taskId])

  const renderEventList = () => {
    return (
      <React.Fragment>
        <List
          style={{ marginTop: '2px' }}
          subheader={
            <ListSubheader disableGutters>Güncellemeler</ListSubheader>
          }
          disablePadding
        >
          {events.map(event => {
            let detail = ''

            if (!event.user || !event.payload) return null

            switch (event.type) {
              case 'task_created':
                detail = `${event.user.name}, bu görevi oluşturdu.`
                break

              case 'task_status_updated':
                detail = `${event.user.name}, görevin durumunu "${
                  taskStatuses && taskStatuses[event.statusId]
                    ? taskStatuses[event.statusId].name
                    : ''
                }" olarak güncelledi.`
                break

              case 'label_added':
                detail = `${event.user.name}, göreve ${event.labels
                  .map(({ name }) => name)
                  .join(', ')} etiketlerini ekledi.`
                break

              case 'task_assign':
                detail = `${event.user.name}, görevi ${event.users
                  .map(({ name }) => name)
                  .join(', ')} adlı kullanıcılara atadı.`
                break

              default:
                detail = ''
            }

            if (detail === '') return null

            return (
              <ListItem key={event._id} button>
                <ListItemAvatar>
                  <UserAvatar user={event.user} />
                </ListItemAvatar>

                <ListItemText
                  primary={detail}
                  secondary={timeDiff(event.date)}
                />
              </ListItem>
            )
          })}
        </List>
      </React.Fragment>
    )
  }

  if (!task) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle>{task.name}</DialogTitle>

      <DialogContent>
        <Grid container spacing={8}>
          <Grid item sm={12} md={4}>
            <List>
              <ListItem>
                <ListItemText primary={task.detail} secondary="Açıklama" />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={moment(task.startDate).format('D MMM')}
                  secondary="Başlangıç Tarihi"
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={moment(task.endDate).format('D MMM')}
                  secondary="Bitiş Tarihi"
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={`${task.progress}%`}
                  secondary="İlerleme"
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      {task.labels &&
                        task.labels.map(label => (
                          <Label
                            key={label._id}
                            label={label}
                            style={{ marginLeft: '2px' }}
                          />
                        ))}
                    </div>
                  }
                  secondary="Etiketler"
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      {task.assignees &&
                        task.assignees.map(user => (
                          <UserAvatar
                            key={user._id}
                            user={user}
                            style={{
                              marginLeft: 2,
                              height: '30px',
                              width: '30px',
                              fontSize: 14
                            }}
                          />
                        ))}
                    </div>
                  }
                  secondary="Görevliler"
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item sm={12} md={8}>
            {renderEventList()}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default TaskDetailModal
