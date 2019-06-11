import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import TaskForm from './TaskForm'

const TaskFormDialog = props => {
  const { open, handleClose, formProps } = props

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="md">
      <DialogTitle>
        {formProps.mode === 'create' ? 'Görev Oluştur' : 'Görevi Düzenle'}
      </DialogTitle>
      <DialogContent>
        <TaskForm {...formProps} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default TaskFormDialog
