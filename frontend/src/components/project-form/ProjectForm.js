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
import { createProject, updateProject } from '../../apis/projects'
import { getUsers } from '../../apis/users'
import _ from 'lodash'

const ProjectForm = props => {
  const { mode, projectId, handleClose } = props
  const [users, setUsers] = useState({})

  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [detail, setDetail] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [members, setMembers] = useState([])

  useEffect(() => {
    getUsers()
      .then(result => setUsers(_.mapKeys(result, '_id')))
      .catch(console.log)
  }, [])

  const onSubmit = () => {
    const project = {
      name,
      goal,
      detail,
      startDate,
      endDate,
      members: members.map(_id => users[_id])
    }

    if (mode === 'create') {
      createProject(project)
        .then(result => handleClose({ ...project, ...result }))
        .catch(console.log)
    } else {
      updateProject(projectId, project)
    }
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
        label="Projenin Amacı"
        value={goal}
        onChange={e => setGoal(e.target.value)}
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

      <Grid container spacing={8} style={{ marginTop: 8 }}>
        <Grid item sm={12} md={4}>
          <TextField
            label="Başlangıç Tarihi"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item sm={12} md={4}>
          <TextField
            label="Bitiş Tarihi"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Üyeler</InputLabel>
            <Select
              multiple
              fullWidth
              value={members}
              onChange={e => setMembers(e.target.value)}
            >
              {_.map(users, user => (
                <MenuItem value={user._id}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 8
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

export default ProjectForm
