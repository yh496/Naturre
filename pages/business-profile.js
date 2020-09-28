import styles from '../styles/Home.module.css';
import ImageStepper from '../components/BusinessProfile/stepper';
import BusinessDetail from '../components/BusinessProfile/BusinessDetail';
import BusinessReview from '../components/BusinessProfile/BusinessReview';
import ReviewStats from '../components/BusinessProfile/ReviewStats';
import BusinessLocation from '../components/BusinessProfile/BusinessLocation';
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
    marginLeft: '130px'
  },
  tabFont: {
    marginLeft: '115px'
  },
  divider: {
    maxWidth: '730px',
    height: '2px',
    transform:'translate(15%, 0%)',
    background: '#e6e8eb'
  },
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
    marginLeft: '115px',
  },
  description: {
    marginLeft: '150px', 
    marginTop: theme.spacing(4), 
    marginBottom: '30px',
    maxWidth: '580px'
}
}));




export default function BusinessProfile() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    location: "",
    images: []
  })

  const [reviewStat, setReviewStat] = useState({
    totalCount: 0 ,
    average: 0, 
    countPerRating:[]
})
  
  useEffect( () => {
   fetch('/api/business-profile/business-detail', {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({id: '5f66f686f6dddb007ba26307'})
  
    }).then(e => e.json()).then(e =>
      setValues({...values, name: e.data.name, description: e.data.description, location: e.data.location, images: e.data.images })
    )
  }, [])

  useEffect( () => {
    fetch('/api/business-profile/review-stats', {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({id: '5f66f686f6dddb007ba26307'})
  
    }).then(e => e.json()).then(e =>
      setReviewStat({...reviewStat, totalCount: e.totalCount, average: parseFloat(e.average).toFixed(1), countPerRating: e.countPerRating})
    )
   }, [])
 
 
  return (
  <React.Fragment>

    <div className={classes.header}> 
      <Typography variant="h2" style={{fontWeight:'650'}}>  {values.name} </Typography>
      <Typography variant="p" style={{fontSize:'14px'}}> {reviewStat.average}* | District, city</Typography>
    </div>

    <Grid container> 
      <Grid item xs={5} className={classes.imageStepper}> 
        <ImageStepper images={values.images}/>
      </Grid> 
      <Grid item xs={5}>
         <ReviewStats reviewStat={reviewStat}/>
         <BusinessLocation location={values.location}/>
      </Grid>
     

    </Grid> 

    <Typography className={classes.description}> {values.description} </Typography> 

  
    <BusinessReview/> 


  </React.Fragment> 
  )
}


