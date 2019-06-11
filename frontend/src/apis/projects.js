import { makeAPIRequest } from './makeAPIRequest'
import { projectsUrl } from './config'

export const getProjects = () => {
  return makeAPIRequest(projectsUrl)
}

export const getProjectById = projectId => {
  return makeAPIRequest(`${projectsUrl}/${projectId}`)
}

export const createProject = props => {
  return makeAPIRequest(projectsUrl, {
    method: 'POST',
    body: JSON.stringify(props)
  })
}

export const updateProject = (_id, props) => {
  return makeAPIRequest(`${projectsUrl}/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(props)
  })
}
