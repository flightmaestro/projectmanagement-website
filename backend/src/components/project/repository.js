const Project = require('./model')

const getProjects = () => {
  return Project.find().sort({ name: 1 })
}

const getProjectById = _id => {
  return Project.findOne({ _id })
}

const createProject = props => {
  const project = new Project(props)
  return project.save()
}

const updateProject = (_id, props) => {
  return Project.findOneAndUpdate({ _id }, props)
}

const addMembers = (_id, members) => {
  return Project.findOneAndUpdate({ _id }, { $push: { members } })
}

const removeMembers = (_id, members) => {
  return Project.findOneAndUpdate(
    { _id },
    { $pull: { members: { _id: { $in: members.map(({ _id }) => _id) } } } }
  )
}

const removeProject = _id => {
  return Project.findOneAndDelete({ _id })
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  addMembers,
  removeMembers,
  removeProject
}
