const mongoose = require('mongoose')

const User = {
  _id: String,
  name: String
}

const ProjectSchema = new mongoose.Schema({
  name: String,
  goal: String,
  detail: String,
  strategy: String,
  manager: User,
  members: [User]
})

module.exports = mongoose.model('Project', ProjectSchema)
