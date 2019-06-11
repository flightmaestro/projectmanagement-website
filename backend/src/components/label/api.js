const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/', ctrl.getLabels)
router.post('/', ctrl.createLabel)
router.put('/:_id', ctrl.updateLabel)
router.delete('/:_id', ctrl.removeLabel)

module.exports = router
