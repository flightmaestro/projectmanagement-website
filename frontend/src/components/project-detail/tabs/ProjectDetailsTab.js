import React, { useEffect, useState } from 'react'

import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader
} from '@material-ui/core'

import UserAvatar from '../../UserAvatar'

import { getProjectById } from '../../../apis/projects'

const ProjectDetailsTab = props => {
  const { project } = props

  if (!project) return null

  return (
    <Grid container spacing={16}>
      <Grid xs={12} md={6} item>
        <Card>
          <List>
            <ListItem>
              <ListItemText primary={project.name} secondary="Projenin Adı" />
            </ListItem>

            <ListItem>
              <ListItemText primary={project.detail} secondary="Açıklama" />
            </ListItem>

            <ListItem>
              <ListItemText primary={project.goal} secondary="Projenin Amacı" />
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid xs={12} md={6} item>
        <Card>
          <List subheader={<ListSubheader>Üyeler</ListSubheader>}>
            {project.manager && (
              <ListItem>
                <ListItemAvatar>
                  <UserAvatar user={project.manager} />
                </ListItemAvatar>

                <ListItemText
                  primary={project.manager.name}
                  secondary="Proje Yöneticisi"
                />
              </ListItem>
            )}

            {project.members &&
              project.members.map(user => (
                <ListItem key={user._id}>
                  <ListItemAvatar>
                    <UserAvatar user={user} />
                  </ListItemAvatar>

                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
          </List>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProjectDetailsTab
