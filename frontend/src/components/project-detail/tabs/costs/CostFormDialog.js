import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Button
} from '@material-ui/core'
import { createCost } from '../../../../apis/costs'

const CostFormDialog = props => {
  const { open, handleClose, projectId } = props

  return (
    <Dialog open={open} handleClose={() => handleClose()}>
      <DialogContent>
        <CostForm projectId={projectId} onSubmit={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

const CostForm = props => {
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [type, setType] = useState('')
  const [total, setTotal] = useState('')

  if (!props.projectId) return null

  const onSubmit = () => {
    const cost = {
      projectId: props.projectId,
      name,
      detail,
      type,
      total: parseFloat(total)
    }

    createCost(cost)
      .then(result => props.onSubmit({ ...cost, ...result }))
      .catch(console.log)
  }

  return (
    <React.Fragment>
      <TextField
        label="Masraf"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
      />

      <TextField
        label="Açıklama"
        value={detail}
        onChange={e => setDetail(e.target.value)}
        multiline
        rows={3}
        fullWidth
      />

      <TextField
        label="Tip"
        value={type}
        onChange={e => setType(e.target.value)}
        fullWidth
      />

      <TextField
        label="Toplam Tutar"
        type="number"
        value={total}
        onChange={e => setTotal(e.target.value)}
        fullWidth
      />

      <Grid
        item
        container
        justify="flex-end"
        spacing={8}
        style={{ marginTop: 8 }}
      >
        <Button onClick={() => onSubmit()} color="primary">
          Kaydet
        </Button>
        <Button onClick={() => props.onSubmit()}>Vazgeç</Button>
      </Grid>
    </React.Fragment>
  )
}

export default CostFormDialog
