import { makeAPIRequest } from './makeAPIRequest'
import { tasksUrl } from './config'
import { buildQueryString } from '../utils'

export const getTasks = params => {
  const queryString = buildQueryString(params)
  return makeAPIRequest(`${tasksUrl}?${queryString}`)
}

export const getTaskById = _id => {
  return makeAPIRequest(`${tasksUrl}/${_id}`)
}

export const createTask = props => {
  return makeAPIRequest(tasksUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}

export const updateTaskStatusId = (_id, statusId) => {
  return makeAPIRequest(`${tasksUrl}/${_id}/statusId`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ statusId })
  })
}
