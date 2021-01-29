import React, {useEffect, useState} from 'react'
import ReviewStats from '../BusinessProfile/ReviewStats'
import ReviewPhotos from '../Reviews/ReviewPhotos';
import { useRouter } from 'next/router';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        height: '100%',
    },
    text: {
        fontWeight: '600',
        fontSize: '22px',
        height: '10%',
        marginBottom: "1rem",
        marginRight: "1rem"
    },
    photoGallery: {
        marginLeft:'4rem',
        height: '100%'
    },
    gridItem: {
        marginRight: '3rem',
        height: '100%'
    },
    text2: {
        color: '#32A482',
        fontSize: '18px',
        lineHeight: '22px'
    },
    arrowRightContainer: {
        width: '30px',
        height: '100%',
        margin: 'auto',

    },
    arrowRight: {
        color: '#000000',
        transform: 'scale(1.5)',
    }

}))


const RatingAndPhotos = () => {
    const classes = useStyles()

    return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item lg={4} className={classes.gridItem}>
                    <Typography className={classes.text}> Rating </Typography>
                    <ReviewStats className={classes.component} />
                </Grid>
                <Grid item lg={6} className={classes.photoGallery}>
                    <div style={{display: 'flex', justifyContent: 'left', textAlign: 'left'}}>
                        <Typography className={classes.text}> Photo Gallery </Typography>
                        <Typography className={classes.text2}> View all </Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <ReviewPhotos/>
                        <div className={classes.arrowRightContainer}>
                            <ArrowRightAltIcon color="inherit" className={classes.arrowRight}/>
                        </div>
                    </div>
                </Grid>

            </Grid>
    )
}


export default RatingAndPhotos;