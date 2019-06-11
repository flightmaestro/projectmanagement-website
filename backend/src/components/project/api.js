const express = require('express')
const ctrl = require('./controller')

const router = express.Router()

router.get('/:projectId', ctrl.getProjectById)
router.get('/', ctrl.getProjects)
router.post('/', ctrl.createProject)

router.post('/:projectId/addMembers', ctrl.addMembers)
router.post('/:projectId/removeMembers', ctrl.removeMembers)

router.put('/:projectId', ctrl.updateProject)
router.delete('/:projectId', ctrl.removeProject)

module.exports = router
