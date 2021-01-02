import React, { useEffect, useState } from 'react'

import {
    Typography,
    Grid,
    Box,
    Slider
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const PrettoSlider = withStyles({
    root: {
        color: '#64B6AC',
        height: 1,
        width: '100%',
    },
    thumb: {
        width:'20px',
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
        width: '90%',
        height: '100%'
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
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'1.1rem'}}> 
                <div style={{display:'flex'}}> 
                    <Typography variant="h1" style={{height: '25px', marginBottom: '10px', fontSize:'48px', marginBottom: '1rem' }}> {reviewStat.average} </Typography>
                    <StarIcon color="inherit" fontSize="large" style={{color:'#7FD4BB', transform:'scale(1.3)', marginLeft:'1rem'}}/>
                </div>
                <div>  
                    <Typography variant="h5" style={{ fontWeight: 'bold', height: '15px', marginTop: '10px', textAlign:'right' }}> {reviewStat.totalCount} reviews </Typography>
                </div> 
            </div>

                {reviewStat.countPerRating.map((val, i) => (
                    <div style={{margin: 'auto', width:'100%', display:'flex', justifyContent: 'space-evenly', marginBottom:'8px'}}>  
                        <div style={{display:'flex', width: '20%', marginLeft:'1rem'}}> 
                            <Typography style={{ fontSize: '24px' }}>{i+1}</Typography>
                            <StarBorderIcon color="inherit" style={{marginLeft:'0.5rem', color:'black', transform:'translate(0%,-10%'}} />
                        </div>
                        <div style={{display:'flex', position: 'relative', width:'60%'}}> 
                            <PrettoSlider
                                style={{transform:'translate(0%,-30%)'}}
                                max={reviewStat.totalCount}
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                value={val[i+1]} />
                        </div>
                        <div style={{width:'20%'}}>
                            <Typography style={{textAlign: 'right'}}> ({val[i+1]}) </Typography>
                        </div>
                    </div> 
                ))}
                {/* <Grid container style={{margin: 'auto', width: '90%'}}> 
                    {reviewStat.countPerRating.map((val, i) => (
                        <React.Fragment>   
                                <Grid item xs={6} lg={2} md={1} sm={5} style={{marginBottom:'15px'}}>
                                    <Typography style={{ display: 'inline', fontSize: '18px' }}>{i+1}</Typography>
                                    <StarBorderIcon style={{display:'inline', transform:'translate(10%, 14%)'}}/>

                                </Grid>
                                <Grid item xs={6} lg={10} md={11} sm={5}>
                                    <PrettoSlider
                                        max={reviewStat.totalCount}
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        value={val[i+1]} />
                                </Grid>
                         </React.Fragment>                   
                        ))
                    }
                </Grid> */}
            </div >
    )
}