import React from 'react'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'

import Drawer from './components/Drawer'
import Login from './routes/Login'

// Routes
import Home from './routes/Home'
import ProjectDetails from './routes/ProjectDetails'

const App = () => {
  const routes = [
    { path: '/home', name: 'Anasayfa', component: Home, icon: <HomeIcon /> }
  ]

  const appRoute = () => (
    <Drawer routes={routes}>
      <Switch>
        <Route path="/projects/:id" component={ProjectDetails} />
        <Route path="/home" component={Home} />
      </Switch>
    </Drawer>
  )

  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path="/(.+)" component={appRoute} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
