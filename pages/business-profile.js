import styles from '../styles/Home.module.css'
import ImageStepper from '../components/BusinessProfile/stepper'
import BusinessDetail from '../components/BusinessProfile/BusinessDetail'
import BusinessReview from '../components/BusinessProfile/BusinessReview';
import {
  Grid,
  Typography,
  Divider
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import {useEffect, useState} from 'react'

const useStyles = makeStyles((theme) => ({
  imageStepper: {
    marginTop: '20px',
    marginLeft: '100px'
  },
  tabFont: {
    marginLeft: '115px'
  },
  divider: {
    maxWidth: '730px',
    height: '2px',
    transform:'translate(15%, 0%)',
    background: '#e6e8eb'
  }
}));




export default function BusinessProfile() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
  })
  
  useEffect( () => {
   fetch('/api/business-profile/business-detail', {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({id: '5f66f686f6dddb007ba26307'})
  
    }).then(e => e.json()).then(e =>
      setValues({...values, name: e.data.name, description: e.data.description})
    )
    
  }, [])


  

  return (
  <React.Fragment>
    <Grid container> 
      <Grid item xs={8} className={classes.imageStepper}> 
        <ImageStepper/>

      </Grid> 

      <Grid item xs={4}>
        {/* //TODO: Review section  */}

      </Grid>

    </Grid> 

    <Typography variant="h4" className={classes.tabFont}>
        Info
    </Typography> 
    <Divider  classes={{root: classes.divider}}/>

    <BusinessDetail detail={{...values}}/>

    <Divider  classes={{root: classes.divider}}/>

    <BusinessReview  />



    </React.Fragment> 
  )
}


