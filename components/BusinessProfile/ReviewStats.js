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

const useStyles = makeStyles((theme) => ({
    reviewContainer: {
        marginTop: theme.spacing(3),
        marginBottom: '20px'
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
            <div>
                <div style={{ marginBottom: '0px', float: 'left' }}>
                    <Typography variant="h1" style={{ transform: 'translate(12%,0%)', height: '25px', marginLeft: '70px', marginBottom: '10px' }}> {reviewStat.average} </Typography>
                    <Rating style={{ marginLeft: '80px' }} size='small' classes={{ iconFilled: classes.ratingIcon }} precision={0.2} value={reviewStat.average} readOnly />
                </div>
                <div >
                    <Typography variant="h5" style={{ fontWeight: 'bold', float: 'right', transform: 'translate(12%,0%)', height: '15px', marginRight: '40px', marginTop: '10px' }}> 6 reviews </Typography>
                </div>
            </div>
            <br />
            <div style={{ marginTop: '40px' }}>
                {console.log(reviewStat.countPerRating)}
                <div style={{ marginLeft: '80px' }}>
                    {reviewStat.countPerRating.map((val, i) => (
                        <React.Fragment>
                            <Grid style={{ display: 'flex' }}>
                                <Grid item xs={2} style={{ transform: 'translate(0%, 15%)' }}>
                                    <Typography style={{ display: 'flex', fontSize: '18px' }}>{val._id}
                                        <StarBorderIcon />
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <PrettoSlider
                                        max={reviewStat.totalCount}
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        value={val.count} />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    ))
                    }
                </div>
            </div>
        </div >
    )
}