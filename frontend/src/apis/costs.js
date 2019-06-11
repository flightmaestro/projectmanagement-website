import { makeAPIRequest } from './makeAPIRequest'
import { costsUrl } from './config'
import { buildQueryString } from '../utils'

export const getCosts = params => {
  const queryString = buildQueryString(params)
  return makeAPIRequest(`${costsUrl}?${queryString}`)
}

export const getCostsByType = params => {
  const queryString = buildQueryString(params)
  return makeAPIRequest(`${costsUrl}/reports/groupByType?${queryString}`)
}

export const createCost = props => {
  return makeAPIRequest(costsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props)
  })
}
