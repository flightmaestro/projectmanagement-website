const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/', ctrl.getTaskStatuses)
router.post('/', ctrl.createTaskStatus)
router.put('/:_id', ctrl.updateTaskStatus)
router.delete('/:_id', ctrl.removeTaskStatus)

module.exports = router
