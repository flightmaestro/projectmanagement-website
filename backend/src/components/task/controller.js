const repository = require('./repository')
const eventRepository = require('../event/repository')

module.exports.getTasks = (req, res) => {
  repository
    .getTasks(req.query)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.getTaskById = (req, res) => {
  const { _id } = req.params

  repository
    .getTask(_id)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createTask = (req, res) => {
  const props = req.body
  const { user } = res.locals

  repository
    .createTask({ ...props, createdAt: new Date(), createdBy: user })
    .then(result => {
      // Send user response first
      res.status(200).json(result)

      // Work on creating necessary events for event list
      const commonProps = {
        projectId: result.projectId,
        taskId: result._id,
        date: result.createdAt,
        user,
        payload: {
          taskName: result.name
        }
      }

      // Create task created event (default)
      eventRepository
        .createEvent({
          type: 'task_created',
          ...commonProps
        })
        .catch(console.log)

      // If task assigned to any user create event record
      if (result.assignees) {
        eventRepository
          .createEvent({
            type: 'task_assign',
            users: result.assignees,
            ...commonProps
          })
          .catch(console.log)
      }

      // If any label added to ask create event record
      if (result.labels) {
        eventRepository
          .createEvent({
            type: 'label_added',
            labels: result.labels,
            ...commonProps
          })
          .catch(console.log)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.updateTask = (req, res) => {
  const { _id } = req.params
  const props = req.body

  repository
    .updateTask(_id, props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.updateTaskStatusId = (req, res) => {
  const { _id } = req.params
  const { statusId } = req.body
  const { user } = res.locals

  repository
    .updateTask(_id, { statusId })
    .then(({ projectId, name }) => {
      res.status(200).json()

      eventRepository.createEvent({
        taskId: _id,
        projectId,
        type: 'task_status_updated',
        user,
        date: new Date(),
        statusId,
        payload: {
          taskName: name
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.removeTask = (req, res) => {
  const { _id } = req.params

  repository
    .removeTask(_id)
    .then(() => res.status(200).json({}))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
