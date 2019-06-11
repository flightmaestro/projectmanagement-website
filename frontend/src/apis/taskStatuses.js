import { makeAPIRequest } from './makeAPIRequest'
import { taskStatusesUrl } from './config'
import { buildQueryString } from '../utils'

export const getTaskStatuses = (params = {}) => {
  const queryString = buildQueryString(params)
  return makeAPIRequest(`${taskStatusesUrl}?${queryString}`)
}

export const createTaskStatus = props => {
  return makeAPIRequest(taskStatusesUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}

export const updateTaskStatus = props => {
  return makeAPIRequest(`${taskStatusesUrl}/${props._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}

export const deleteTaskStatus = _id => {
  return makeAPIRequest(`${taskStatusesUrl}/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}
