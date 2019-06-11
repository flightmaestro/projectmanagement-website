const repository = require('./repository')

module.exports.getLabels = (req, res) => {
  const { projectId } = req.query

  repository
    .getLabels(projectId)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createLabel = (req, res) => {
  const props = req.body

  repository
    .createLabel(props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.updateLabel = (req, res) => {
  const { _id } = req.params
  const props = req.body

  repository
    .updateLabel(_id, props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.removeLabel = (req, res) => {
  const { _id } = req.params

  repository
    .removeLabel(_id)
    .then(() => res.status(200).json({}))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
