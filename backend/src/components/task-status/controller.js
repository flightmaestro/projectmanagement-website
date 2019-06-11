const repository = require('./repository')

module.exports.getTaskStatuses = (req, res) => {
  repository
    .getTaskStatuses(req.query)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createTaskStatus = (req, res) => {
  const props = req.body

  repository
    .createTaskStatus(props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.updateTaskStatus = (req, res) => {
  const { _id } = req.params
  const props = req.body

  repository
    .updateTaskStatus(_id, props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.removeTaskStatus = (req, res) => {
  const { _id } = req.params

  repository
    .removeTaskStatus(_id)
    .then(() => res.status(200).json({}))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
