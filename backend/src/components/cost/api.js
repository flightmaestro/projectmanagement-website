const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/reports/groupByType', ctrl.getGroupByTypeReport)

router.get('/', ctrl.getCosts)
router.post('/', ctrl.createCost)
router.put(':costId', ctrl.updateCost)
router.put(':costId', ctrl.removeCost)

module.exports = router
