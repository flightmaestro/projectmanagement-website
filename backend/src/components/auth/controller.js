const repository = require('./repository')
const jwt = require('../../jwt')

module.exports.signInWithEmailAndPassword = (req, res) => {
  const { email, password } = req.body
  let user = null

  repository
    .getUserByEmail(email)
    .then(_user => {
      if (!_user) throw new Error('Email or password wrong.')

      user = _user

      return user.validatePassword(password)
    })
    .then(same => {
      if (!same) throw new Error('Email or password wrong.')

      return user.generateJWT()
    })
    .then(token => res.status(200).json({ token, name: user.name, _id: user._id }))
    .catch(err => {
      console.log(err)
      res.status(401).send()
    })
}

module.exports.signInWithSecret = (req, res) => {
  const token = req.headers.authorization

  jwt
    .verify(token)
    .then(() => res.status(200).send())
    .catch(() => res.status(401).send())
}
