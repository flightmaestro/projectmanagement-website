import { token } from '../globals'

export const makeAPIRequest = (url, opt) => {
  return fetch(url, {
    ...opt,
    headers: { Authorization: token, 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (!response.ok) throw new Error(response)

      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}
