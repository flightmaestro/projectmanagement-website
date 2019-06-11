import React, { useEffect, useState } from 'react'
import { getCosts } from '../../../../apis/costs'
import {
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  ListSubheader
} from '@material-ui/core'

import { Add as AddIcon } from '@material-ui/icons'

import moment from 'moment'
import CostFormDialog from './CostFormDialog'

const CostList = props => {
  const [costs, setCosts] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const { projectId } = props

  useEffect(() => {
    if (projectId) {
      getCosts({ projectId })
        .then(_costs => setCosts(_costs))
        .catch(console.log)
    }
  }, [projectId])

  const onCreateCost = cost => {
    if (cost) setCosts([...costs, cost])

    setDialogOpen(false)
  }

  const renderCostList = () => {
    if (!costs) return null

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Masraf</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>Tip</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>Toplam</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {costs.map(cost => (
            <TableRow>
              <TableCell>{cost.name}</TableCell>
              <TableCell>{cost.detail}</TableCell>
              <TableCell>{cost.type}</TableCell>
              <TableCell>{moment(cost.date).format('D MMM')}</TableCell>
              <TableCell align="right">{cost.total} ₺</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <React.Fragment>
      <Card>
        <Grid container spacing={8}>
          <Grid
            container
            item
            xs={12}
            justify="space-between"
            alignItems="center"
          >
            <ListSubheader>Proje Masrafları</ListSubheader>

            <Tooltip title="Yeni Masraf">
              <IconButton onClick={() => setDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid xs={12} item>
            <Card>{renderCostList()}</Card>
          </Grid>
        </Grid>
      </Card>

      <CostFormDialog
        open={dialogOpen}
        handleClose={onCreateCost}
        projectId={projectId}
      />
    </React.Fragment>
  )
}

export default CostList
