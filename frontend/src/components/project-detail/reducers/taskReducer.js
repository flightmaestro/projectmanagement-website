import { mapKeys } from 'lodash'

export default (state = {}, action) => {
  console.log(action)

  switch (action.type) {
    case 'tasks_fetched':
      return mapKeys(action.payload, '_id')

    case 'task_created':
      return { ...state, [action.payload._id]: action.payload }

    case 'task_updated':
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          ...action.payload
        }
      }

    default:
      return state
  }
}
