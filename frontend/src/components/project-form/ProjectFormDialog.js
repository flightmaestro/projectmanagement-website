import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import ProjectForm from './ProjectForm'

const ProjectFormDialog = props => {
  const { open, handleClose, formProps } = props

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        {formProps.mode === 'create' ? 'Proje Oluştur' : 'Projeyi Düzenle'}
      </DialogTitle>
      <DialogContent>
        <ProjectForm {...formProps} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectFormDialog
