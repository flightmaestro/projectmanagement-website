const mongoose = require('mongoose')

const TaskStatusSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  detail: String
})

module.exports = mongoose.model('TaskStatus', TaskStatusSchema)
