const mongoose = require('mongoose')

const LabelSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  name: String,
  colorCode: String
})

module.exports = mongoose.model('Label', LabelSchema)
