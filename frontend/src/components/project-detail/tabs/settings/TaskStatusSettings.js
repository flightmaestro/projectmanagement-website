import React, { useState } from 'react'
import {
  Card,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Button,
  IconButton,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent
} from '@material-ui/core'

import { Create as EditIcon } from '@material-ui/icons'

import _ from 'lodash'
import {
  createTaskStatus,
  updateTaskStatus
} from '../../../../apis/taskStatuses'

const TaskStatusSettings = props => {
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [taskStatus, setTaskStatus] = useState(null)

  const { taskStatuses, dispatch, projectId } = props

  const renderList = () => {
    if (!taskStatuses) return null

    return (
      <List>
        {_.map(taskStatuses, status => (
          <ListItem key={status._id}>
            <ListItemText primary={status.name} secondary={status.detail} />

            <ListItemSecondaryAction>
              <Tooltip title="Düzenle">
                <IconButton
                  onClick={() => {
                    setFormMode('update')
                    setTaskStatus(status)
                    setFormDialogOpen(true)
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ListSubheader>Görev Durumları</ListSubheader>

        <Button
          style={{ margin: 4 }}
          onClick={() => {
            setFormMode('create')
            setFormDialogOpen(true)
          }}
          color="primary"
        >
          Yeni Durum
        </Button>
      </div>

      {renderList()}

      <TaskStatusDialog
        open={formDialogOpen}
        mode={formMode}
        taskStatus={taskStatus}
        projectId={projectId}
        handleClose={() => setFormDialogOpen(false)}
        dispatch={dispatch}
      />
    </Card>
  )
}

const TaskStatusDialog = props => {
  const { open, projectId, taskStatus, mode, handleClose, dispatch } = props

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === 'create' ? 'Yeni Görev Durumu' : 'Görev Durumunu Düzenle'}
      </DialogTitle>

      <DialogContent>
        <TaskStatusForm
          mode={mode}
          dispatch={dispatch}
          taskStatus={taskStatus}
          projectId={projectId}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

const TaskStatusForm = props => {
  const {
    mode,
    projectId,
    taskStatus: _taskStatus,
    handleClose,
    dispatch
  } = props

  const initialState = {
    name: '',
    detail: '',
    projectId
  }

  const [taskStatus, setTaskStatus] = useState(
    mode === 'create' ? initialState : _taskStatus
  )

  const handleChange = (key, value) => {
    setTaskStatus({ ...taskStatus, [key]: value })
  }

  const onFormSubmit = () => {
    if (mode === 'create') {
      // Create
      createTaskStatus(taskStatus)
        .then(result => {
          dispatch({
            type: 'task_status_created',
            payload: result
          })

          handleClose()
        })
        .catch(console.log)
    } else {
      // Update
      updateTaskStatus(taskStatus)
        .then(() => {
          dispatch({
            type: 'task_status_updated',
            payload: taskStatus
          })

          handleClose()
        })
        .catch(console.log)
    }
  }

  return (
    <React.Fragment>
      <TextField
        label="Durum Adı"
        value={taskStatus.name}
        onChange={e => handleChange('name', e.target.value)}
        fullWidth
      />

      <TextField
        label="Açıklama"
        value={taskStatus.detail}
        onChange={e => handleChange('detail', e.target.value)}
        fullWidth
      />

      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}
      >
        <Button
          style={{ marginRight: '4px' }}
          onClick={onFormSubmit}
          color="primary"
        >
          {mode === 'create' ? 'Oluştur' : 'Güncelle'}
        </Button>

        <Button style={{ marginRight: '4px' }} onClick={handleClose}>
          Vazgeç
        </Button>
      </div>
    </React.Fragment>
  )
}

export default TaskStatusSettings
