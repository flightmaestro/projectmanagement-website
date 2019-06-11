const repository = require('./repository')

module.exports.getEvents = (req, res) => {
  repository
    .getEvents(req.query)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createEvent = (req, res) => {
  const props = req.body

  repository
    .createEvent(props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
