const TaskStatus = require('./model')

const getTaskStatuses = params => {
  let query = {}

  Object.keys(params).map(key => {
    switch (key) {
      case 'projectId':
        query[key] = params[key]
        break
      default:
        break
    }
  })

  return TaskStatus.find(query)
}

const createTaskStatus = props => {
  const taskStatus = new TaskStatus(props)
  return taskStatus.save()
}

const updateTaskStatus = (_id, props) => {
  return TaskStatus.findOneAndUpdate({ _id }, props)
}

const removeTaskStatus = _id => {
  return TaskStatus.findOneAndDelete({ _id })
}

module.exports = {
  getTaskStatuses,
  createTaskStatus,
  updateTaskStatus,
  removeTaskStatus
}
