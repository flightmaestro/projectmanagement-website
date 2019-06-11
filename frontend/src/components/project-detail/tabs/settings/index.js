import React from 'react'

import { Grid } from '@material-ui/core'

import LabelSettings from './LabelSettings'
import TaskStatusSettings from './TaskStatusSettings'

const SettingsTab = props => {
  const {
    projectId,
    labels,
    taskStatuses,

    dispatchLabelAction,
    dispatchTaskStatusAction
  } = props

  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={6}>
        <LabelSettings
          projectId={projectId}
          labels={labels}
          dispatch={dispatchLabelAction}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TaskStatusSettings
          projectId={projectId}
          taskStatuses={taskStatuses}
          dispatch={dispatchTaskStatusAction}
        />
      </Grid>
    </Grid>
  )
}

export default SettingsTab
