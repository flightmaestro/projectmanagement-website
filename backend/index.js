require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { server } = require('./src/config')
const mongoDB = require('./src/database')
const jwt = require('./src/jwt')

const authRoute = require('./src/components/auth/api')
const usersRoute = require('./src/components/user/api')
const projectsRoute = require('./src/components/project/api')
const eventsRoute = require('./src/components/event/api')
const labelsRoute = require('./src/components/label/api')
const costsRoute = require('./src/components/cost/api')
const tasksRoute = require('./src/components/task/api')
const taskStatusesRoute = require('./src/components/task-status/api')

const app = express()

app.use('/', bodyParser.json())
app.use('/', cors())

app.use('/auth', authRoute)

// Authorization: Token check
app.use('/', (req, res, next) => {
  const token = req.headers.authorization

  jwt
    .verify(token)
    .then(payload => {
      if (!payload) {
        res.status(401).send()
        return
      }

      const { _id, name } = payload

      if (!_id || !name) {
        res.status(401).send()
        return
      }

      res.locals.user = { _id, name }
      next()
    })
    .catch(err => {
      console.log(err)
      res.status(401).send()
    })
})

// Routes
app.use('/users', usersRoute)
app.use('/projects', projectsRoute)
app.use('/events', eventsRoute)
app.use('/tasks', tasksRoute)
app.use('/taskStatuses', taskStatusesRoute)
app.use('/labels', labelsRoute)
app.use('/costs', costsRoute)

mongoDB
  .connect()
  .then(
    app.listen(server.port, () =>
      console.log(`Application listening port ${server.port}...`)
    )
  )
  .catch(err => console.log(err))
