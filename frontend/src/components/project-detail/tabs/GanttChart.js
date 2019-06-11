import React from 'react'
import { Chart } from 'react-google-charts'
import { Card, ListSubheader } from '@material-ui/core'

import moment from 'moment'
import _ from 'lodash'

const GanttChart = props => {
  const { tasks } = props

  if (!tasks) return null

  let taskCount = Object.keys(tasks).length

  if (taskCount === 0) return null

  return (
    <Card style={{ padding: 8 }}>
      <ListSubheader>Gantt Çizelgesi</ListSubheader>

      <Chart
        width={'100%'}
        height={42 * taskCount + 50}
        chartType="Gantt"
        loader={<div>Loading Gantt Chart</div>}
        data={[
          [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' }
          ],
          ..._.map(tasks, task => [
            task._id,
            task.name,
            moment(task.startDate).toDate(),
            moment(task.endDate).toDate(),
            null,
            task.progress,
            null
          ])
        ]}
      />
    </Card>
  )
}

export default GanttChart
