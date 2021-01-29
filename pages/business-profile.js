import ImageStepper from '../components/BusinessProfile/stepper';
import ReviewSection from '../components/BusinessProfile/ReviewSection';
import FAQSection from '../components/BusinessProfile/FAQSection';
import ReviewStats from '../components/BusinessProfile/ReviewStats';
import BusinessLocation from '../components/BusinessProfile/BusinessLocation';
import ServiceList from '../components/BusinessProfile/ServiceList'
import ManagerInfo from '../components/BusinessProfile/ManagerInfo'

import { useRouter } from 'next/router';
import SideInfo from '../components/BusinessProfile/SideInfo';

import {
  Grid,
  Typography,
  Divider
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect, useState } from 'react'
import StarIcon from "@material-ui/icons/Star";
import ReviewContext from "../components/Contexts/ReviewContext";

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
    maxWidth: '650px',
    fontSize: '18px'
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


  const [reviewContext, setReviewContext] = useState({
    ...ReviewContext.getReviewContext()
  })

  ReviewContext.render = () => {
    setReviewContext({...reviewContext, ...ReviewContext.getReviewContext()})
  }

  useEffect(() => {
    (async function initializeReviews () {
      await ReviewContext.initialize(router.query.id, 2)
      ReviewContext.render();

    })();
  },[])


  useEffect(() => {
    fetch('/api/business-profile/inc-viewcount', {
      method:'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: router.query.id })
    }).then(e=>e.json()).then(e=> {
      console.log(e)
    })
  },[])

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

  console.log('review context', ReviewContext.getReviewContext())

  return (
    <React.Fragment>
      <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
        <Typography style={{ fontWeight: '650', fontSize: '48px', lineHeight: '52px' }}>  {values.name} </Typography>
        <Typography style={{ fontSize: '24px', lineHeight: '52px' }}> {reviewContext.reviewStats.average}* | {values.location.address}</Typography>
      </div>
      <Grid container style={{ width: '80%', margin: 'auto', marginTop: '20px', height: '550px' }}>
        <Grid item xs={6} lg={8} md={6} sm={5} style={{height: '100%'}}>
          <ImageStepper images={values.images} />
        </Grid>

        <Grid item xs={6} lg={4} md={6} sm={5}>
          <div style={{ height: "50%" }}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '90%', marginLeft:'auto', marginRight: 'auto',marginBottom: '1.1rem'}}>
              <div style={{display:'flex'}}>
                <Typography variant="h1" style={{height: '25px', fontSize:'48px', marginBottom: '1rem' }}> {reviewContext.reviewStats.average} </Typography>
                <StarIcon color="inherit" fontSize="large" style={{color:'#7FD4BB', transform:'scale(1.3)', marginLeft:'1rem'}}/>
              </div>
              <div>
                <Typography variant="h5" style={{ fontWeight: 'bold', height: '15px', marginTop: '10px', textAlign:'right' }}> {reviewContext.reviewStats.totalCount} reviews </Typography>
              </div>
            </div>
            <ReviewStats />
          </div>
          <div style={{ height: "50%" }}>
            <BusinessLocation location={values.location} />
          </div>
        </Grid>
      </Grid>
      <Grid container style={{ width: '80%', margin: 'auto', marginTop: '3.5rem' }}>
        <Grid item xs={6} lg={8} md={6} sm={5}>
          <Typography style={{ fontSize: '18px', fontWeight: 500, marginBottom: '2.5rem' }}> {values.description} </Typography>
          <ServiceList services={values.services} />
        </Grid>
        <Grid item xs={6} lg={4} md={6} sm={5}>
          <ManagerInfo manager={values.manager} />
          <Divider style={{ width: "90%", marginLeft: '1rem' }} />
          <SideInfo address={values.location.address} />
        </Grid>
      </Grid>
      <div style={{ width: '95%', margin: 'auto' }}>
        <FAQSection businessId={router.query.id} businessName={values.name} />
        <ReviewSection businessId={router.query.id} businessName={values.name} />
      </div>
    </React.Fragment>
  )
}


