const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.post('/login', ctrl.signInWithEmailAndPassword)
router.post('/secret', ctrl.signInWithSecret)

module.exports = router
