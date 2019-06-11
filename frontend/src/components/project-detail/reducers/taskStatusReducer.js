import { mapKeys } from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case 'task_statuses_fetched':
      return mapKeys(action.payload, '_id')

    case 'task_status_created':
    case 'task_status_updated':
      return {
        ...state,
        [action.payload._id]: action.payload
      }

    case 'task_status_deleted':
      const { [action.payload._id]: _, ...rest } = state
      return { ...rest }

    default:
      return state
  }
}
