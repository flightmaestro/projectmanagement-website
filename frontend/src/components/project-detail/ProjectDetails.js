import React, { useState, useReducer, useEffect } from 'react'

import DnD from './tabs/task-dnd/DnD'
import ProjectDetailsTab from './tabs/ProjectDetailsTab'
import SettingsTab from './tabs/settings'
import Dashboard from './tabs/dashboard'
import CostList from './tabs/costs/CostList'

import { Tabs, Tab, AppBar } from '@material-ui/core'

import TaskDetailModal from '../TaskDetailModal'
import CreateTaskFabButton from '../task-form/CreateTaskFabButton'

import _ from 'lodash'
import { getTasks } from '../../apis/tasks'

import userReducer from './reducers/userReducer'
import labelReducer from './reducers/labelReducer'
import taskReducer from './reducers/taskReducer'
import taskStatusReducer from './reducers/taskStatusReducer'
import { getTaskStatuses } from '../../apis/taskStatuses'
import { getLabels } from '../../apis/labels'
import { getProjectById } from '../../apis/projects'

const ProjectDetails = props => {
  let [tabValue, setTabValue] = useState(0)
  let [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false)
  let [selectedTaskId, setSelectedTaskId] = useState('')

  const [project, setProject] = useState()
  const [users, dispatchUserAction] = useReducer(userReducer)
  const [labels, dispatchLabelAction] = useReducer(labelReducer)
  const [tasks, dispatchTaskAction] = useReducer(taskReducer)
  const [taskStatuses, dispatchTaskStatusAction] = useReducer(taskStatusReducer)

  const { projectId } = props

  // If projectId changes get all
  // labels, tasks, taskStatuses, users and details for project by id
  // and distribute it all components
  useEffect(() => {
    // Fetch projectDetails
    getProjectById(projectId)
      .then(result => {
        setProject(result)

        dispatchUserAction({ type: 'users_fetched', payload: result.members })
      })
      .catch(console.log)

    // Fetch tasks
    getTasks({ projectId })
      .then(tasks =>
        dispatchTaskAction({ type: 'tasks_fetched', payload: tasks })
      )
      .catch(console.log)

    // Fetch labels
    getLabels({ projectId })
      .then(labels =>
        dispatchLabelAction({ type: 'labels_fetched', payload: labels })
      )
      .catch(console.log)

    // Fetch taskStatuses
    getTaskStatuses({ projectId })
      .then(taskStatuses =>
        dispatchTaskStatusAction({
          type: 'task_statuses_fetched',
          payload: taskStatuses
        })
      )
      .catch(console.log)
  }, [projectId])

  const onTaskSelect = taskId => {
    setSelectedTaskId(taskId)
    setTaskDetailModalOpen(true)
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
          <Tab label="Dashboard" />
          <Tab label="Detaylar" />
          <Tab label="Pano" />
          <Tab label="Masraflar" />
          <Tab label="Ayarlar" />
        </Tabs>
      </AppBar>

      <div style={{ height: '16px' }} />

      {tabValue === 0 && (
        <Dashboard
          projectId={projectId}
          labels={labels}
          taskStatuses={taskStatuses}
          tasks={tasks}
          users={users}
          openTaskDetail={onTaskSelect}
        />
      )}

      {tabValue === 1 && <ProjectDetailsTab project={project} />}

      {tabValue === 2 && (
        <DnD
          tasks={tasks}
          taskStatuses={taskStatuses}
          openTaskDetail={onTaskSelect}
          onUpdateTaskStatus={(taskId, statusId) =>
            dispatchTaskAction({
              type: 'task_updated',
              payload: { _id: taskId, statusId }
            })
          }
        />
      )}

      {tabValue === 3 && <CostList projectId={projectId} />}

      {tabValue == 4 && (
        <SettingsTab
          projectId={projectId}
          labels={labels}
          taskStatuses={taskStatuses}
          dispatchLabelAction={dispatchLabelAction}
          dispatchTaskStatusAction={dispatchTaskStatusAction}
        />
      )}

      <TaskDetailModal
        open={taskDetailModalOpen}
        taskId={selectedTaskId}
        taskStatuses={taskStatuses}
        handleClose={() => {
          setSelectedTaskId('')
          setTaskDetailModalOpen(false)
        }}
      />

      <CreateTaskFabButton
        projectId={projectId}
        labels={labels}
        users={users}
        taskStatuses={taskStatuses}
        onTaskCreate={task =>
          dispatchTaskAction({ type: 'task_created', payload: task })
        }
      />
    </React.Fragment>
  )
}

export default ProjectDetails
