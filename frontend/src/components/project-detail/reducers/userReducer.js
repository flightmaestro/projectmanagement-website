import { mapKeys } from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case 'users_fetched':
      return mapKeys(action.payload, '_id')

    case 'user_added':
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case 'user_removed':
      const { [action.payload._id]: _, ...rest } = state
      return { ...rest }

    default:
      return state
  }
}
