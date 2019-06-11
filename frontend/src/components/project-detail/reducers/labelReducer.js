import { mapKeys } from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case 'labels_fetched':
      return mapKeys(action.payload, '_id')

    case 'label_created':
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case 'label_updated':
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          ...action.payload
        }
      }

    case 'label_deleted':
      const { [action.payload._id]: _, ...rest } = state
      return { ...rest }

    default:
      return state
  }
}
