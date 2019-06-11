const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/', ctrl.getUsers)
router.post('/', ctrl.createUser)

module.exports = router
