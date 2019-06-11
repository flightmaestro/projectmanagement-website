import React, { useState, useEffect } from 'react'
import { Card, ListSubheader } from '@material-ui/core'
import Chart from 'react-google-charts'
import _ from 'lodash'
import { getCostsByType } from '../../../../apis/costs'

const TDRByLabels = props => {
  const { projectId } = props
  const [costs, setCosts] = useState([])

  useEffect(() => {
    if (projectId) {
      getCostsByType({ projectId }).then(results => {
        if (results) {
          const _costs = results.reduce((acc, cur) => {
            acc.push([cur._id, cur.totalCost])
            return acc
          }, [])

          setCosts(_costs)
        }
      })
    }
  }, [projectId])

  if (costs.length === 0) return null

  return (
    <Card>
      <ListSubheader>Tiplerine Göre Masraf Dağılımı</ListSubheader>

      <Chart
        width={'auto'}
        height={'auto'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Masraf', 'Toplam (₺)'], ...costs]}
      />
    </Card>
  )
}

export default TDRByLabels
