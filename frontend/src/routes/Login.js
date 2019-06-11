import React, { useState } from 'react'
import {
  TextField,
  Button,
  Card,
  Grid,
  CardContent,
  Typography
} from '@material-ui/core'
import { signInWithEmailAndPassword } from '../apis/auth'
import { Redirect } from 'react-router-dom'
import { setToken, setUser } from '../globals'

const Login = props => {
  const [goHome, setGoHome] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    signInWithEmailAndPassword(email, password)
      .then(({ token, _id, name }) => {
        setToken(token)
        setUser({ _id, name })

        setGoHome(true)
      })
      .catch(console.log)
  }

  if (goHome) return <Redirect to="/home" />

  return (
    <Grid container justify="center">
      <Grid item sm={10} md={4}>
        <Card style={{ marginTop: 40 }}>
          <CardContent>
            <Typography align="canter" variant="title">
              Hoşgeldiniz
            </Typography>

            <TextField
              style={{ marginTop: 20 }}
              label="Kullanıcı Adı"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="Şifre"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />

            <Grid container justify="flex-end" style={{ marginTop: 12 }}>
              <Button onClick={onSubmit} color="primary">
                Giriş Yap
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Login
