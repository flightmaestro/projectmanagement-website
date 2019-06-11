const Task = require('./model')

const getTasks = params => {
  let query = {}

  Object.keys(params).map(key => {
    switch (key) {
      case 'projectId':
        query[key] = params[key]
        break

      case 'userId':
        query.assignees = { $elemMatch: { _id: params[key] } }
        break

      default:
        break
    }
  })

  return Task.find(query).sort({ createdAt: -1 })
}

const getTask = _id => {
  return Task.findOne({ _id })
}

const createTask = props => {
  const task = new Task(props)
  return task.save()
}

const updateTask = (_id, props) => {
  return Task.findOneAndUpdate({ _id }, props)
}

const removeTask = _id => {
  return Task.findOneAndDelete({ _id })
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  removeTask
}
