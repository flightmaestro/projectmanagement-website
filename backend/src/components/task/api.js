const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/:_id', ctrl.getTaskById)
router.get('/', ctrl.getTasks)
router.post('/', ctrl.createTask)
router.put('/:_id/statusId', ctrl.updateTaskStatusId)
router.put('/:_id', ctrl.updateTask)
router.delete('/:_id', ctrl.removeTask)

module.exports = router
