import React, { useState, useEffect } from 'react'
import { Card, ListSubheader } from '@material-ui/core'
import Chart from 'react-google-charts'
import _ from 'lodash'

const TDRByStatus = props => {
  const { tasks, taskStatuses } = props
  const [statusCounts, setStatusCounts] = useState([])

  useEffect(() => {
    if (!tasks || !taskStatuses) return

    let result = {}

    _.map(tasks, ({ statusId }) => {
      if (statusId) {
        if (result[statusId]) {
          result[statusId][1] += 1
        } else {
          if (taskStatuses[statusId])
            result[statusId] = [taskStatuses[statusId].name, 1]
        }
      }
    })

    setStatusCounts(Object.values(result))
  }, [tasks, taskStatuses])

  if (statusCounts.length === 0) return null

  return (
    <Card>
      <ListSubheader>Durum Bazında Görev Dağılımı</ListSubheader>

      <Chart
        width={'auto'}
        height={'auto'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Label', 'Count'], ...statusCounts]}
      />
    </Card>
  )
}

export default TDRByStatus
