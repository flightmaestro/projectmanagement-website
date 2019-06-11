const repository = require('./repository')

module.exports.getGroupByTypeReport = (req, res) => {
  const params = req.query

  repository
    .groupByType(params)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.getCosts = (req, res) => {
  const params = req.query

  repository
    .getCosts(params)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createCost = (req, res) => {
  const props = req.body

  repository
    .createCost(props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.updateCost = (req, res) => {
  const costId = req.params
  const props = req.body

  repository
    .updateCost(costId, props)
    .then(() => res.status(200).json())
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.removeCost = (req, res) => {
  const costId = req.params

  repository
    .removeCost(costId)
    .then(() => res.status(200).json())
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
