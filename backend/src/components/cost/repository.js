const Cost = require('./model')

const getCosts = params => {
  let query = _buildQuery(params)

  return Cost.find(query)
}

const createCost = props => {
  const cost = new Cost({ ...props, date: new Date() })
  return cost.save()
}

const updateCost = (_id, props) => {
  return Cost.findOneAndUpdate({ _id }, props)
}

const removeCost = _id => {
  return Cost.findByIdAndRemove({ _id })
}

const groupByType = params => {
  let query = _buildQuery(params)

  return Cost.aggregate([
    {
      $match: query
    },
    {
      $group: {
        _id: '$type',
        totalCost: { $sum: '$total' }
      }
    }
  ])
}

const _buildQuery = params => {
  let query = {}

  if (!params) return query

  Object.keys(params).map(key => {
    switch (key) {
      case 'projectId':
        query[key] = params[key]
        break

      default:
        break
    }
  })

  return query
}

module.exports = {
  getCosts,
  createCost,
  updateCost,
  removeCost,
  groupByType
}
