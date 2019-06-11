const Label = require('./model')

const getLabels = projectId => {
  return Label.find({ projectId }).sort({ name: 1 })
}

const createLabel = props => {
  const label = new Label(props)
  return label.save()
}

const updateLabel = (_id, props) => {
  return Label.findOneAndUpdate({ _id }, props)
}

const removeLabel = _id => {
  return Label.findOneAndDelete({ _id })
}

module.exports = {
  getLabels,
  createLabel,
  updateLabel,
  removeLabel
}
