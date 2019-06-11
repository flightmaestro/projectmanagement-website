const repository = require('./repository')
const eventRepository = require('../event/repository')

module.exports.getProjects = (req, res) => {
  repository
    .getProjects()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.getProjectById = (req, res) => {
  const { projectId } = req.params

  repository
    .getProjectById(projectId)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.createProject = (req, res) => {
  const props = req.body
  const { user } = res.locals

  repository
    .createProject(props)
    .then(result => {
      eventRepository.createEvent({
        projectId: result._id,
        type: 'project_created',
        user,
        date: new Date(),
        payload: {
          projectName: props.name
        }
      })

      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.updateProject = (req, res) => {
  const { projectId } = req.params
  const props = req.body

  repository
    .updateProject(projectId, props)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.addMembers = (req, res) => {
  const { projectId } = req.params
  const { members } = req.body

  repository
    .addMembers(projectId, members)
    .then(() => res.status(200).json())
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.removeMembers = (req, res) => {
  const { projectId } = req.params
  const { members } = req.body

  repository
    .removeMembers(projectId, members)
    .then(() => res.status(200).json())
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}

module.exports.removeProject = (req, res) => {
  const { projectId } = req.params

  repository
    .removeProject(projectId)
    .then(() => res.status(200).json({}))
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
}
