const User = require('../user/model')

const getUserByEmail = email => {
  return User.findOne({ email })
}

module.exports = {
  getUserByEmail
}
