import { makeAPIRequest } from './makeAPIRequest'
import { authUrl } from './config'

export const signInWithEmailAndPassword = (email, password) => {
  return makeAPIRequest(`${authUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
}
