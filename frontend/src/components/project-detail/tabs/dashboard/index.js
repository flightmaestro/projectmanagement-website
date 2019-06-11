import React from 'react'
import { Grid } from '@material-ui/core'
import _ from 'lodash'

import TDRByLabels from './TDRbyLabels'
import TDRByStatus from './TDRByStatus'
import TDRByUsers from './TDRByUsers'

import GanttChart from '../GanttChart'
import CostDistributionByTypes from './CostDistributionByTypes'

const Dashboard = props => {
  const {
    tasks,
    taskStatuses,
    openTaskDetail,
    labels,
    users,
    projectId
  } = props

  return (
    <Grid container spacing={8}>
      <Grid item sm={12} md={4}>
        <TDRByLabels tasks={tasks} />
      </Grid>

      <Grid item sm={12} md={4}>
        <TDRByStatus tasks={tasks} taskStatuses={taskStatuses} />
      </Grid>

      <Grid item sm={12} lg={4}>
        <CostDistributionByTypes projectId={projectId} />
      </Grid>

      <Grid item sm={12} md={4}>
        <TDRByUsers tasks={tasks} />
      </Grid>

      <Grid item sm={12} md={8}>
        <GanttChart
          tasks={tasks}
          taskStatuses={taskStatuses}
          openTaskDetail={openTaskDetail}
        />
      </Grid>
    </Grid>
  )
}

export default Dashboard
