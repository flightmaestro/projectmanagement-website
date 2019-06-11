import React, { useState } from 'react'
import { Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import TaskFormDialog from './TaskFormDialog';

const CreateTaskFabButton = props => {
  const { projectId, taskStatuses, onTaskCreate, labels, users } = props

  let [modalOpen, setModalOpen] = useState(false)

  const handleClose = (task = null) => {
    if (task != null) {
      onTaskCreate(task)
    }

    setModalOpen(false)
  }

  return (
    <React.Fragment>
      <Tooltip title="Görev Oluştur">
        <Fab
          color="primary"
          variant="extended"
          style={{ position: 'fixed', bottom: 12, right: 12 }}
          onClick={() => setModalOpen(true)}
        >
          <AddIcon />
          Yeni Görev
        </Fab>
      </Tooltip>

      <TaskFormDialog
        open={modalOpen}
        handleClose={handleClose}
        formProps={{
          mode: 'create',
          projectId,
          taskStatuses,
          labels,
          users
        }}
      />
    </React.Fragment>
  )
}

export default CreateTaskFabButton
