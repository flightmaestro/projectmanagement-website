const _getToken = () => localStorage.getItem('itil_token')

export const setToken = _token => {
  localStorage.setItem('itil_token', _token)
  token = _token
}

const _getUser = () => {
  let _user = localStorage.getItem('itil_user')

  try {
    _user = JSON.parse(_user)

    return _user
  } catch (e) {
    console.log(e)
    return {
      _id: '',
      name: ''
    }
  }
}

export const setUser = _user => {
  localStorage.setItem('itil_user', JSON.stringify(_user))
  user = _user
}

export let token = _getToken()
export let user = _getUser()
