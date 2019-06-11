import React, { useEffect, useState } from 'react'
import UserAvatar from '../UserAvatar'
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import { getEvents } from '../../apis/events'
import { timeDiff } from '../../utils'
import _ from 'lodash'

const EventList = props => {
  const [events, setEvents] = useState([])

  const { taskStatuses } = props

  useEffect(() => {
    getEvents({ limit: 10 })
      .then(_events => setEvents(_events))
      .catch(console.log)
  }, [])

  if (!events) return null

  return (
    <Card>
      <List subheader={<ListSubheader>Haber Akışı</ListSubheader>}>
        {events.map(event => {
          let detail = ''

          if (!event.user || !event.payload) return null

          switch (event.type) {
            case 'project_created':
              detail = `${event.user.name}, "${
                event.payload.projectName
              }" adlı bir proje oluşturdu.`
              break

            case 'task_created':
              detail = `${event.user.name}, "${
                event.payload.taskName
              }" adlı bir görev oluşturdu.`
              break

            case 'task_status_updated':
              detail = `${event.user.name}, "${
                event.payload.taskName
              }" adlı görevin durumunu "${
                taskStatuses && taskStatuses[event.statusId]
                  ? taskStatuses[event.statusId].name
                  : ''
              }" olarak güncelledi.`
              break

            case 'label_added':
              detail = `${event.user.name}, "${
                event.payload.taskName
              }" adlı göreve ${event.labels
                .map(({ name }) => name)
                .join(', ')} etiketlerini ekledi.`
              break

            case 'task_assign':
              detail = `${event.user.name}, "${
                event.payload.taskName
              }" adlı görevi ${event.users
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

              <ListItemText primary={detail} secondary={timeDiff(event.date)} />
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}

export default EventList
