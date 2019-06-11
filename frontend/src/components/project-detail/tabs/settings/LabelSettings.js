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

import Label from '../../../Label'

import _ from 'lodash'
import { createLabel, updateLabel } from '../../../../apis/labels'

const LabelSettings = props => {
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [label, setLabel] = useState(null)

  const { labels, dispatch, projectId } = props

  const renderList = () => {
    if (!labels) return null

    return (
      <List>
        {_.map(labels, label => (
          <ListItem key={label._id}>
            <ListItemText
              primary={<Label label={label} />}
              secondary={label.detail}
            />

            <ListItemSecondaryAction>
              <Tooltip title="Düzenle">
                <IconButton
                  onClick={() => {
                    setFormMode('update')
                    setLabel(label)
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
        <ListSubheader>Etiketler</ListSubheader>

        <Button
          style={{ margin: 4 }}
          onClick={() => {
            setFormMode('create')
            setFormDialogOpen(true)
          }}
          color="primary"
        >
          Yeni Etiket
        </Button>
      </div>

      {renderList()}

      <LabelFormDialog
        open={formDialogOpen}
        mode={formMode}
        label={label}
        projectId={projectId}
        handleClose={() => setFormDialogOpen(false)}
        dispatch={dispatch}
      />
    </Card>
  )
}

const LabelFormDialog = props => {
  const { open, projectId, label, mode, handleClose, dispatch } = props

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === 'create' ? 'Yeni Etiket' : 'Etiketi Düzenle'}
      </DialogTitle>

      <DialogContent>
        <LabelForm
          mode={mode}
          dispatch={dispatch}
          label={label}
          projectId={projectId}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

const LabelForm = props => {
  const { mode, projectId, label: _label, handleClose, dispatch } = props

  const initialState = {
    name: '',
    detail: '',
    projectId
  }

  const [label, setLabel] = useState(mode === 'create' ? initialState : _label)

  const handleChange = (key, value) => {
    setLabel({ ...label, [key]: value })
  }

  const onFormSubmit = () => {
    if (mode === 'create') {
      // Create
      createLabel(label)
        .then(result => {
          dispatch({
            type: 'label_created',
            payload: result
          })

          handleClose()
        })
        .catch(console.log)
    } else {
      // Update
      updateLabel(label)
        .then(() => {
          dispatch({
            type: 'label_updated',
            payload: label
          })

          handleClose()
        })
        .catch(console.log)
    }
  }

  return (
    <React.Fragment>
      <TextField
        label="Etiket"
        value={label.name}
        onChange={e => handleChange('name', e.target.value)}
        fullWidth
      />

      <TextField
        label="Açıklama"
        value={label.detail}
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

export default LabelSettings
