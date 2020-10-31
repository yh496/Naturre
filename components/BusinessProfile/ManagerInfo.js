import React, { useEffect, useState } from 'react'
// import user from "../../public/user.png"
import {
  Typography,
  Grid,
  Box,
  Slider,
  Button,
  Paper
} from '@material-ui/core'

import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  managerContent: {
    marginLeft: '10px',
    width: '400px',
  }
}))
export default function ManagerInfo(props) {
  const { manager, ...rest } = props
  const classes = useStyles();

  return (
    <div className={classes.managerContent}>
      <Grid container>
        <Grid item>
          <img style={{ width: '50px', height: '50px' }} src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg" alt="logo" />
        </Grid>
        <Grid item>
          <h1 style={{ margin: '0px', marginTop: '5px', marginLeft: '15px' }}>{manager.name}</h1>
          <h3 style={{ margin: '0px', marginTop: '5px', marginLeft: '15px' }}>{manager.role}</h3>
        </Grid>
      </Grid>
      <p style={{ margin: '0px', marginTop: '10px', marginLeft: '55px' }}>{manager.description}</p>
    </div>
  )
}