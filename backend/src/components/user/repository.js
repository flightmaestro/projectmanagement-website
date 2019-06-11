const User = require('./model')

const getUsers = params => {
  // TODO
  let query = {}
  return User.find(query, { name: 1 })
}

const createUser = props => {
  const user = new User(props)
  return user.save()
}

module.exports = {
  getUsers,
  createUser
}