const Event = require('./model')

const getEvents = params => {
  let query = {}

  let limit = 0

  Object.keys(params).map(key => {
    switch (key) {
      case 'projectId':
      case 'taskId':
        query[key] = params[key]
        break

      case 'limit':
        limit = parseInt(params[key])
        break

      default:
        break
    }
  })

  return Event.find(query)
    .sort({ date: -1 })
    .limit(limit)
}

const createEvent = props => {
  const event = new Event(props)
  return event.save()
}

module.exports = {
  getEvents,
  createEvent
}
