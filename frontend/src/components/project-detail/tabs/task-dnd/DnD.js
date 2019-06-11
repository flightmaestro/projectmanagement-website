import React, { useState, useEffect } from 'react'
import Column from './Column'

import { Grid } from '@material-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'

import _ from 'lodash'
import { updateTaskStatusId } from '../../../../apis/tasks'

const DnD = props => {
  const { tasks, taskStatuses, onUpdateTaskStatus } = props

  let [data, setData] = useState(null)

  useEffect(() => {
    setData({
      tasks,
      columns: _.reduce(
        taskStatuses,
        (acc, cur) => ({
          ...acc,
          [cur._id]: {
            ...cur,
            taskIds: _.filter(
              tasks,
              ({ statusId }) => statusId === cur._id
            ).map(({ _id }) => _id)
          }
        }),
        {}
      ),
      columnOrder: _.map(taskStatuses, ({ _id }) => _id)
    })
  }, [tasks, taskStatuses])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    // User dropped item outside of columns
    if (!destination) return

    // User dropped item in same list
    if (source.droppableId === destination.droppableId) {
      return
    }

    // Make API Request
    updateTaskStatusId(draggableId, destination.droppableId)

    // Get source and destination columns
    let sourceColumn = data.columns[source.droppableId]
    let destinationColumn = data.columns[destination.droppableId]

    // Remove task from source columns taskIds array
    let newTaskIdsSourceColumn = [...sourceColumn.taskIds]
    newTaskIdsSourceColumn.splice(source.index, 1)

    // Add task id to destination column taskIds array
    let newTaskIdsDestinationColumn = [...destinationColumn.taskIds]
    newTaskIdsDestinationColumn.splice(destination.index, 0, draggableId)

    // Create new column objects
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: newTaskIdsSourceColumn
    }

    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: newTaskIdsDestinationColumn
    }

    // Create new state
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn._id]: newSourceColumn,
        [destinationColumn._id]: newDestinationColumn
      }
    }

    setData(newData)
    onUpdateTaskStatus(draggableId, destination.droppableId)
  }

  if (data == null) return null

  return (
    <Grid container spacing={16}>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map(taskId => data.tasks[taskId])

          return (
            <Grid item xs={8} md={4}>
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                openTaskDetail={props.openTaskDetail}
              />
            </Grid>
          )
        })}
      </DragDropContext>
    </Grid>
  )
}

export default DnD
