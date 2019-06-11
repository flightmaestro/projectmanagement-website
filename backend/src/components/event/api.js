const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/', ctrl.getEvents)
router.post('/', ctrl.createEvent)

module.exports = router
