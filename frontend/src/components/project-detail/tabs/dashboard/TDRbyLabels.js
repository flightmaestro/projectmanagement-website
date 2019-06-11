import React, { useState, useEffect } from 'react'
import { Card, ListSubheader } from '@material-ui/core'
import Chart from 'react-google-charts'
import _ from 'lodash'

const TDRByLabels = props => {
  const { tasks } = props
  const [labelsCounts, setLabelCounts] = useState([])

  useEffect(() => {
    if (!tasks) return

    let result = {}

    _.map(tasks, ({ labels }) => {
      if (labels) {
        labels.map(label => {
          if (result[label._id]) {
            result[label._id][1] += 1
          } else {
            result[label._id] = [label.name, 1]
          }
        })
      }
    })

    setLabelCounts(Object.values(result))
  }, [tasks])

  if (labelsCounts.length === 0) return null

  return (
    <Card>
      <ListSubheader>Etiket Bazında Görev Dağılımı</ListSubheader>

      <Chart
        width={'auto'}
        height={'auto'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Label', 'Count'], ...labelsCounts]}
      />
    </Card>
  )
}

export default TDRByLabels
