const mongoose = require('mongoose')

const User = {
  _id: String,
  name: String
}

const Label = {
  _id: String,
  name: String
}

const TaskSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  
  statusId: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    required: true
  },

  createdAt: Date,
  createdBy: User,

  detail: String,
  startDate: Date,
  endDate: Date,
  progress: {
    type: Number,
    default: 0
  },

  labels: [Label],
  assignees: [User]
})

module.exports = mongoose.model('Task', TaskSchema)
