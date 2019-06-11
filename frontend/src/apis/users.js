import { makeAPIRequest } from './makeAPIRequest'
import { usersUrl } from './config'

export const getUsers = () => {
  return makeAPIRequest(usersUrl)
}
