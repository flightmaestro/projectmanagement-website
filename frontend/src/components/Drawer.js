import React from 'react'

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Add as AddIcon
} from '@material-ui/icons'

import { Link, Redirect } from 'react-router-dom'
import UserAvatar from './UserAvatar'

import _projects from '../mock-data/projects.json'
import ProjectFormDialog from './project-form/ProjectFormDialog'

import { getProjects } from '../apis/projects'
import { user, setUser, setToken } from '../globals'

const drawerWidth = 240
const title = 'ITIL Project'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
})

class ResponsiveDrawer extends React.Component {
  state = {
    goLogin: false,
    mobileOpen: false,
    projectDialogOpen: false,
    projects: []
  }

  componentDidMount() {
    getProjects()
      .then(projects => this.setState({ projects }))
      .catch(console.log)
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  onCreateProject = project => {
    let newState = { projectDialogOpen: false }

    if (project) newState.projects = [...this.state.projects, project]

    this.setState(newState)
  }

  onClickLogout = () => {
    setUser({ _id: '', name: '' })
    setToken('')

    this.setState({ goLogin: true })
  }

  render() {
    if (this.state.goLogin) return <Redirect to="/" />

    const { classes, theme, routes, children } = this.props

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />

        <List>
          <ListItem>
            <ListItemAvatar>
              <UserAvatar user={user} />
            </ListItemAvatar>

            <ListItemText primary={user && user.name} />

            <ListItemSecondaryAction>
              <IconButton onClick={this.onClickLogout}>
                <LogoutIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider />

        <List>
          {routes.map(({ name, path, icon }) => (
            <Link to={path} key={name}>
              <ListItem button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />

        <List
          subheader={
            <ListSubheader>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="subtitle2">Projeler</Typography>

                <Tooltip title="Yeni Proje Oluştur">
                  <IconButton
                    onClick={() => this.setState({ projectDialogOpen: true })}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </ListSubheader>
          }
        >
          {this.state.projects.map(({ _id, name }) => (
            <Link to={`/projects/${_id}`} key={_id}>
              <ListItem button>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>

          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}

          <ProjectFormDialog
            open={this.state.projectDialogOpen}
            handleClose={this.onCreateProject}
            formProps={{
              mode: 'create'
            }}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)
