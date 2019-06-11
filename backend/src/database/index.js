const mongoose = require('mongoose')
const { mongo } = require('../config')

module.exports.connect = () => {
  mongoose.set('useCreateIndex', true)
  mongoose.set(`useFindAndModify`, false)

  return mongoose.connect(mongo.uri, { useNewUrlParser: true })
}
