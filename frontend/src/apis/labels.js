import { makeAPIRequest } from './makeAPIRequest'
import { labelsUrl } from './config'
import { buildQueryString } from '../utils'

export const getLabels = params => {
  const queryString = buildQueryString(params)
  return makeAPIRequest(`${labelsUrl}?${queryString}`)
}

export const createLabel = props => {
  return makeAPIRequest(labelsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}

export const updateLabel = props => {
  return makeAPIRequest(`${labelsUrl}/${props._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}

export const deleteLabel = _id => {
  return makeAPIRequest(`${labelsUrl}/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}
