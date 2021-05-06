import React from 'react'
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

import AdminNavButton from './AdminNavButton'
import LogOutNavButton from './LogOutNavButton'
import toskaLogo from '../../assets/toscalogo_white.svg'

const useLogoStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
  },
  image: {
    width: '2.5rem',
    height: 'auto',
    marginLeft: theme.spacing(1),
  },
}))

const Logo = () => {
  const classes = useLogoStyles()

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.link}>
        <Typography variant="h6" component="h1">
          Palaute
        </Typography>
        <img src={toskaLogo} alt="Toska" className={classes.image} />
      </Link>
    </div>
  )
}

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Logo />
      <AdminNavButton />
      <LogOutNavButton />
    </Toolbar>
  </AppBar>
)

export default NavBar
