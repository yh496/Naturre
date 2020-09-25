import React, {useEffect, useState} from 'react'

import { 
    Typography,
    Grid,
    Box,
    Slider 
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
    root: {
      color: 'blue',
      height: 1,
      width: '300px',
    },
    thumb: {
        width: 0,
        height: 0,
        "&:focus, &:hover, &$active": {
          boxShadow: "0 0px 0px 0px"
        }
      },
    active: {},
    valueLabel: {
      left: 'calc(-50% - 13px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const useStyles=makeStyles( (theme) => ({
    reviewContainer: {
        marginTop: theme.spacing(3),
        marginLeft: '115px',
        marginBottom: '100px'
    },
    ratingIcon: {
        color: 'blue',
        width: '14px'
    },
    graphContainer: {
        marginLeft: theme.spacing(10)
    }
}))


export default function ReviewStat () {
    const [reviewStat, setReviewStat] = useState({
        totalCount: 0 ,
        average: 0, 
        countPerRating:[]
    })
   

    useEffect( () => {
        fetch('/api/business-profile/review-stats', {
           method: 'POST',
           headers: { "Content-Type": "application/json; charset=utf-8" },
           body: JSON.stringify({id: '5f66f686f6dddb007ba26307'})
       
         }).then(e => e.json()).then(e =>
           setReviewStat({...reviewStat, totalCount: e.totalCount, average: parseFloat(e.average).toFixed(1), countPerRating: e.countPerRating})
         )
         
    }, [])

    const classes=useStyles();
    return (
        <div className={classes.reviewContainer}>
            <Typography style={{fontWeight: 560, fontSize: '20px'}}> Reviews </Typography>
            <Grid container> 
                <Grid item xs={1}>
                    <Typography variant="h1" style={{transform:'translate(12%,0%)', marginTop: '20px', height:'25px'}}> {reviewStat.average} </Typography>
                    <div style={{marginBottom: '20px'}}> 
                        <Rating size='small' classes={{iconFilled: classes.ratingIcon}} precision={0.2} value={reviewStat.average} readOnly /> 
                    </div>
                    <Typography variant="p" style={{marginLeft: '4px', height:'25px'}} > {reviewStat.totalCount}+ rating </Typography>
                </Grid> 
                <Grid item xs={4} className={classes.graphContainer}>
                    {console.log(reviewStat.countPerRating)}
                    <Grid container>
                        {reviewStat.countPerRating.map( (val,i) => (
                            <React.Fragment>
                                <Grid item xs={1} style={{transform:'translate(0%, 15%)'}}>
                                    <Typography style={{display:'inline'}}>{val._id} </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <PrettoSlider 
                                    max={reviewStat.totalCount} 
                                    valueLabelDisplay="auto" 
                                    aria-label="pretto slider" 
                                    value={val.count}/>
                                </Grid>
                            </React.Fragment> 
                        ))
                        }
                    </Grid>             
                   
                </Grid>

            </Grid>
        </div>
    )
}