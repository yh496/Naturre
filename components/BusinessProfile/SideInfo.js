import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Button, Typography} from '@material-ui/core'




const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2rem'
    },
   addressContainer: {
       display: 'flex',
       justifyContent: 'start',
       width: '80%',

       margin:'auto'
   },

   buttonContainer: {
     width: '80%',
        margin:'auto',
       marginTop: '2rem',
       display: 'flex', 
       justifyContent: 'space-around'
   },

   button1: {
       background: 'white',
       color: '#64B6AC',
       borderRadius: '24px',
       width: '120px'
   },
   button2: {
       background: '#64B6AC',
       color: 'white',
       borderRadius: '24px',
       width: '120px'

   }
  }));


const SideInfo = (props) => {

    const {address, ...rest} =props


    const classes = useStyles();

    return (

        <div className={classes.root}> 
            <div className={classes.addressContainer}> 
                <LocationOnIcon style={{marginRight:'1rem'}}/>
                <Typography> {address} </Typography> 
            </div>

            <div className= {classes.buttonContainer}> 
                <Button color="inherit" variant="outlined" className={classes.button1}> Chat </Button>
                <Button color="inherit" variant="outlined" className={classes.button2}> Book Now </Button>
            </div> 
        </div>

    )
}

export default SideInfo;