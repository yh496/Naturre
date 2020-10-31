import React, { useEffect, useState } from 'react'
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
  serviceContainer: {
    marginTop: theme.spacing(3),
    marginLeft: '110px',
    marginBottom: '100px',
  },
  serviceContent: {
    padding: '20px',
    marginBottom: '1rem',
    height: '100px',
    maxHeight: '130px',
    overflow: 'hidden',
  },
  serviceTitle: {
    marginLeft: '110px'
  }
}))


export default function ServiceList(props) {

  const { services, ...rest } = props
  const title = 'Services'
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.serviceTitle} variant="h2" style={{}}> {title} </Typography>
      <div className={classes.serviceContainer}>
        <div style={{ width: '90%' }}>
          {services.map((val, i) => (
            <Paper style={{
              borderRadius: '14px',
            }}>
              <div className={classes.serviceContent}>
                <Typography variant="p" style={{ fontWeight: 700, fontSize: '20px', width: '50%' }}> {val.name} </Typography>
                <Typography variant="h5" style={{ float: 'right' }}> {val.price} </Typography>
                <br />
                <Typography variant="p"> {val.description} </Typography>

              </div>
            </Paper>
          ))}
        </div>
      </div>
    </React.Fragment>
  )

}