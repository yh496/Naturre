import styles from '../styles/Home.module.css'
import ImageStepper from '../components/BusinessProfile/stepper'

import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  imageStepper: {
    marginLeft: '100px'
  },

}));

export default function BusinessProfile() {
  const classes = useStyles();
  return (
  <React.Fragment>
    <Grid container> 
      <Grid item xs={8} className={classes.imageStepper}> 
        <ImageStepper/>

      </Grid> 

    </Grid> 
  </React.Fragment> 
  )
}