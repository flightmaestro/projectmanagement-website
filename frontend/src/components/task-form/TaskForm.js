import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@material-ui/core'
import { createTask } from '../../apis/tasks'
import _ from 'lodash'

const TaskForm = props => {
  const { mode, taskStatuses, handleClose } = props

  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [statusId, setStatusId] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [labels, setLabels] = useState([])
  const [assignees, setAssignees] = useState([])

  useEffect(() => {
    const ids = Object.keys(taskStatuses)
    
    if (ids.length !== 0)
      setStatusId(taskStatuses[ids[0]]._id)
  }, [taskStatuses])

  const onSubmit = () => {
    const task = {
      projectId: props.projectId,
      name,
      detail,
      statusId,
      startDate,
      endDate,
      labels: labels.map(_id => props.labels[_id]),
      assignees: assignees.map(_id => props.users[_id])
    }

    createTask(task)
      .then(result => handleClose(result))
      .catch(console.log)
  }

  return (
    <div>
      <TextField
        label="Başlık"
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

      <Grid style={{ marginTop: 8 }} spacing={8} container>
        <Grid item xs={4}>
          <TextField
            label="Başlangıç Tarihi"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Bitiş Tarihi"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Görev Durumu</InputLabel>
            <Select
              value={statusId}
              onChange={e => setStatusId(e.target.value)}
              fullWidth
            >
              {taskStatuses &&
                _.map(taskStatuses, status => (
                  <MenuItem value={status._id}>{status.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={8} style={{ marginTop: 8 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Görevliler</InputLabel>
            <Select
              multiple
              value={assignees}
              onChange={e => setAssignees(e.target.value)}
              fullWidth
            >
              {props.users &&
                _.map(props.users, user => (
                  <MenuItem value={user._id}>{user.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Etiketler</InputLabel>
            <Select
              multiple
              value={labels}
              onChange={e => setLabels(e.target.value)}
              fullWidth
            >
              {props.labels &&
                _.map(props.labels, label => (
                  <MenuItem value={label._id}>{label.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '8px'
        }}
      >
        <Button onClick={() => handleClose()}>Vazgeç</Button>

        <Button color="primary" onClick={onSubmit}>
          {mode === 'create' ? 'Oluştur' : 'Güncelle'}
        </Button>
      </div>
    </div>
  )
}

export default TaskForm
