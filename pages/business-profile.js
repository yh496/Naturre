import ImageStepper from '../components/BusinessProfile/stepper';
import CommentSection from '../components/BusinessProfile/CommentSection';
import ReviewStats from '../components/BusinessProfile/ReviewStats';
import ServiceList from '../components/BusinessProfile/ServiceList';
import ManagerInfo from "../components/BusinessProfile/ManagerInfo";
import BusinessLocation from '../components/BusinessProfile/BusinessLocation';
import { useRouter } from 'next/router';
import {
  Grid,
  Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  imageStepper: {
    marginTop: '20px',
    marginLeft: '110px',
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
    marginLeft: '110px',
  },
  description: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
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
    manager: {}
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

    }).then(e => e.json()).then(e => {
      setValues({
        ...values, name: e.data.name, description: e.data.description, location: e.data.location, images: e.data.images,
        services: e.data.services, manager: e.data.manager
      })
    })
  }, [])

  useEffect(() => {
    fetch('/api/business-profile/review-stats', {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: router.query.id })

    }).then(e => e.json()).then(e =>
      setReviewStat({ ...reviewStat, totalCount: e.totalCount, average: parseFloat(e.average).toFixed(1), countPerRating: e.countPerRating })
    )
  }, [])


  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography variant="h2" style={{ fontWeight: '650' }}>  {values.name} </Typography>
        <Typography variant="p" style={{ fontSize: '16px' }}> {values.location}</Typography>
      </div>
      <Grid container style={{ marginBottom: '50px' }}>
        <Grid item xs={5} className={classes.imageStepper}>
          <ImageStepper images={values.images} />
          <Typography className={classes.description}> {values.description} </Typography>
        </Grid>
        <Grid item xs={4} style={{ marginLeft: '100px' }}>
          <ReviewStats reviewStat={reviewStat} />
          <BusinessLocation location={values.location} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <ServiceList services={values.services} />
        </Grid>
        <Grid item xs={15}>
          <ManagerInfo manager={values.manager} />
        </Grid>
      </Grid>
      <CommentSection type='questions' />
      <CommentSection type='review' />
    </React.Fragment>
  )
}


