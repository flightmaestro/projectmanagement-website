import { makeAPIRequest } from './makeAPIRequest'
import { eventsUrl } from './config'
import { buildQueryString } from '../utils'

export const getEvents = (params = {}) => {
  const queryString = buildQueryString(params)
  return makeAPIRequest(`${eventsUrl}?${queryString}`)
}

export const createEvent = props => {
  return makeAPIRequest(eventsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}
