import React, { useState, useEffect } from 'react'
import { Card, ListSubheader } from '@material-ui/core'
import Chart from 'react-google-charts'
import _ from 'lodash'

const TDRByStatus = props => {
  const { tasks, taskStatuses } = props
  const [userTaskCounts, setUserTaskCounts] = useState([])

  useEffect(() => {
    if (!tasks) return

    let result = {}

    _.map(tasks, ({ assignees }) => {
      if (assignees) {
        assignees.map(assignee => {
          const { _id, name } = assignee

          if (result[_id]) {
            result[_id][1] += 1
          } else {
            result[_id] = [name, 1]
          }
        })
      }
    })

    setUserTaskCounts(Object.values(result))
  }, [tasks])

  if (userTaskCounts.length === 0) return null

  return (
    <Card>
      <ListSubheader>Kullanıcı Bazında Görev Dağılımı</ListSubheader>

      <Chart
        width={'auto'}
        height={'auto'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[['Kullanıcı', 'Görev Sayısı'], ...userTaskCounts]}
        options={{
          legend: { position: 'none' }
        }}
      />
    </Card>
  )
}

export default TDRByStatus
