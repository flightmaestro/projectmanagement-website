import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import TaskList from '../components/home/TaskList'
import EventList from '../components/home/EventList'
import TaskDetailModal from '../components/TaskDetailModal'

import { getTaskStatuses } from '../apis/taskStatuses'
import _ from 'lodash'

const Home = () => {
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [taskDetailOpen, setTaskDetailOpen] = useState(false)
  const [taskStatuses, setTaskStatuses] = useState({})

  useEffect(() => {
    getTaskStatuses()
      .then(_taskStatuses => setTaskStatuses(_.mapKeys(_taskStatuses, '_id')))
      .catch(console.log)
  }, [])

  const openTaskDetail = taskId => {
    setSelectedTaskId(taskId)
    setTaskDetailOpen(true)
  }

  return (
    <React.Fragment>
      <Grid container spacing={32}>
        <Grid item sm={12} md={6}>
          <EventList />
        </Grid>

        <Grid item container spacing={16} sm={12} md={6}>
          <Grid item xs={12}>
            <TaskList openTaskDetail={openTaskDetail} />
          </Grid>
        </Grid>
      </Grid>

      <TaskDetailModal
        open={taskDetailOpen}
        handleClose={() => {
          setSelectedTaskId('')
          setTaskDetailOpen(false)
        }}
        taskId={selectedTaskId}
        taskStatuses={taskStatuses}
      />
    </React.Fragment>
  )
}

export default Home
