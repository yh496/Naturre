import React, {useEffect, useState} from 'react'
import ReviewStats from '../BusinessProfile/ReviewStats'
import { useRouter } from 'next/router';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

import ReviewContext from "../Contexts/ReviewContext";



const useStyles = makeStyles((theme) => ({
    root: {
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





const RatingAndPhotos = () => {
    const router = useRouter()
    useEffect(() => {
        (async function initializeReviews () {
            await ReviewContext.initialize(router.query.id, 2)
        })();
    },[])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item lg={6}>
                    <Typography> Rating </Typography>
                    <ReviewStats />
                </Grid>
                <Grid item lg={6}>

                </Grid>
            </Grid>
        </div>
    )
}


export default RatingAndPhotos;