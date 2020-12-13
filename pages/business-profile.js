import styles from '../styles/Home.module.css';
import ImageStepper from '../components/BusinessProfile/stepper';
import BusinessDetail from '../components/BusinessProfile/BusinessDetail';
import CommentSection from '../components/BusinessProfile/CommentSection';
import ReviewStats from '../components/BusinessProfile/ReviewStats';
import BusinessLocation from '../components/BusinessProfile/BusinessLocation';
import ServiceList from '../components/BusinessProfile/ServiceList'
import ManagerInfo from '../components/BusinessProfile/ManagerInfo'

import { useRouter } from 'next/router';
import {
  Grid,
  Typography,
  Divider
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  imageStepper: {
    // marginTop: '20px',
  },
  tabFont: {
    marginLeft: '115px'
  },
  divider: {
    maxWidth: '730px',
    height: '2px',
    transform: 'translate(15%, 0%)',
    background: '#e6e8eb'
  },
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(4),
    marginBottom: '30px',
    maxWidth: '650px'
  }
}));

export default function BusinessProfile() {
  const router = useRouter();

  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    location: "",
    images: [],
    services: [],
    manager: ""
  })

  const [reviewStat, setReviewStat] = useState({
    totalCount: 0,
    average: 0,
    countPerRating: []
  })

  useEffect(() => {
    fetch('/api/business-profile/business-detail', {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: router.query.id })

    }).then(e => e.json()).then(e =>
      setValues({
        ...values,
        name: e.data.name,
        description: e.data.description,
        location: e.data.location,
        images: e.data.images,
        services: e.data.services,
        manager: e.data.manager
      })
    )
  }, [])

  useEffect(() => {
    fetch('/api/business-profile/review-stats', {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: router.query.id })

    }).then(e => e.json()).then(e => {

      const tempList = []
      for (let i = 1; i < 6; i++) {
        let tempObj = {}
        tempObj[i] = e.ratings && e.ratings[i] || 0
        tempList.push(tempObj)
      }

      console.log(tempList)
      setReviewStat(
        {
          ...reviewStat,
          totalCount: e.ratings && e.ratings.count || 0,
          average: e.ratings && parseFloat(e.ratings.average).toFixed(1) || 0,
          countPerRating: tempList
        })
    }
    )
  }, [])


  return (
    <React.Fragment>
      {/* 
    <div className={classes.header}> 
      <Typography variant="h2" style={{fontWeight:'650'}}>  {values.name} </Typography>
      <Typography variant="p" style={{fontSize:'14px'}}> {reviewStat.average}* | {values.location}</Typography>
    </div> */}
      <Grid container spacing={2} style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
        <Grid item xs={6} lg={7} md={6} sm={5} >
          <Typography variant="h2" style={{ fontWeight: '650' }}>  {values.name} </Typography>
          <Typography variant="p" style={{ fontSize: '14px' }}> {reviewStat.average}* | {values.location}</Typography>
          <ImageStepper images={values.images} />
          <Typography className={classes.description}> {values.description} </Typography>
        </Grid>

        <Grid item xs={6} lg={5} md={6} sm={5}>
          <ReviewStats reviewStat={reviewStat} />
          <BusinessLocation location={values.location} />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ width: '80%', margin: 'auto' }}>
        <Grid item lg={7}>
          <ServiceList services={values.services} />
        </Grid>
        {(values.manager !== undefined && values.manager !== "") ?
          <Grid item lg={5}>
            <ManagerInfo manager={values.manager} />
          </Grid> : null}
      </Grid>

      <div style={{ width: '95%', margin: 'auto' }}>
        <CommentSection type='questions' />

        <CommentSection type='review' />
      </div>


    </React.Fragment>
  )
}


