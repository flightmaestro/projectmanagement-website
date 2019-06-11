const jwt = require('jsonwebtoken')

const {
  jwt: { secret }
} = require('../config')

module.exports.verify = token => {
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('JWT must be provided'))
    
    try {
      const payload = jwt.verify(token, secret)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports.sign = payload => {
  return jwt.sign(payload, secret)
}
