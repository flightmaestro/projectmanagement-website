const repository = require('./repository')

module.exports.getUsers = (req, res) => {
  repository
    .getUsers(req.query)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createUser = (req, res) => {
  const props = req.body

  repository
    .createUser(props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
