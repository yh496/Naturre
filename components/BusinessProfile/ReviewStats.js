import React, { useEffect, useState } from 'react'

import {
    Typography,
    Grid,
    Box,
    Slider
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const PrettoSlider = withStyles({
    root: {
        color: '#49AD82',
        height: 1,
        width: '100%',
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

const useStyles = makeStyles((theme) => ({
    reviewContainer: {
        margin: 'auto',
        width: '80%',
    },
    ratingIcon: {
        color: '#49AD82',
        width: '14px'
    },
    graphContainer: {
        // marginLeft: theme.spacing(10)
    }
}))


export default function ReviewStat(props) {
    const { reviewStat, ...rest } = props


    const classes = useStyles();
    return (
        <div className={classes.reviewContainer}>
            {/* <div>
                <div style={{  float: 'left' }}>
                    <Typography variant="h1" style={{ transform: 'translate(12%,0%)', height: '25px', marginLeft: '70px', marginBottom: '10px' }}> {reviewStat.average} </Typography>
                    <Rating style={{ marginLeft: '80px' }} size='small' classes={{ iconFilled: classes.ratingIcon }} precision={0.2} value={reviewStat.average} readOnly />
                </div>
                <div >
                    <Typography variant="h5" style={{ fontWeight: 'bold', float: 'right', transform: 'translate(12%,0%)', height: '15px', marginRight: '40px', marginTop: '10px' }}> 6 reviews </Typography>
                </div>
            </div> */}
                <Grid container spacing={2} style={{marginTop:'63px'}}>
                    <Grid item xs={6} lg={4} md={6} sm={5}> 
                        <Typography variant="h1" style={{height: '25px', marginBottom: '10px' }}> {reviewStat.average} </Typography>
                        <Rating style={{ }} size='small' classes={{ iconFilled: classes.ratingIcon }} precision={0.2} value={reviewStat.average} readOnly />
                    </Grid>
                    <Grid item xs={6} lg={8} md={6} sm={5} style={{float: 'right'}}> 
                        <Typography variant="h5" style={{ fontWeight: 'bold', height: '15px', marginTop: '10px', textAlign:'right' }}> 6 reviews </Typography>
                    </Grid>
                </Grid> 
                <Grid container style={{margin: 'auto', width: '90%'}}> 
                    {reviewStat.countPerRating.map((val, i) => (
                        <React.Fragment>   
                                <Grid item xs={6} lg={2} md={1} sm={5} style={{marginBottom:'15px'}}>
                                    <Typography style={{ display: 'inline', fontSize: '18px' }}>{val._id}</Typography>
                                    <StarBorderIcon style={{display:'inline', transform:'translate(10%, 14%)'}}/>

                                </Grid>
                                <Grid item xs={6} lg={10} md={11} sm={5}>
                                    <PrettoSlider
                                        max={reviewStat.totalCount}
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        value={val.count} />
                                </Grid>
                         </React.Fragment>                   
                        ))
                    }
                </Grid>
            </div >
    )
}