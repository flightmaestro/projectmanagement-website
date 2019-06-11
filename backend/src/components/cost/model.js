const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CostSchema = new Schema({
  projectId: {
    type: String,
    required: true
  },
  type: String,
  name: String,
  detail: String,
  date: Date,
  total: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Cost', CostSchema)
