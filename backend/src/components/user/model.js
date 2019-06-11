const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('../../jwt')

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
})

// Hash user password before create query
UserSchema.pre('save', function(next) {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => next(err))
})

// Compare hash of given password with users password hash
UserSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

// Generate JWT for user
UserSchema.methods.generateJWT = function() {
  const accessToken = jwt.sign({
    _id: this._id,
    name: this.name
  })

  return accessToken
}

module.exports = mongoose.model('User', UserSchema)
