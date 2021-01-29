import React, {useEffect, useState} from 'react'
import ReviewStats from '../BusinessProfile/ReviewStats'
import ReviewPhotos from '../Reviews/ReviewPhotos';
import { useRouter } from 'next/router';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

import ReviewContext from "../Contexts/ReviewContext";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        height: '100%',
    },
    text: {
        fontWeight: '600',
        fontSize: '22px',
        margin: 'auto',
        height: '10%',
        marginBottom: "1rem"
    },
    photoGallery: {
        marginLeft:'2rem',
        height: '100%'
    },
    gridItem: {
        marginRight: '3rem',
        height: '100%'
    },
    component: {
    }
}))


const RatingAndPhotos = () => {
    const router = useRouter()

    const [reviewData, setReviewData] = useState({
        ...ReviewContext.getReviewContext
    })

    ReviewContext.render = () => {
        setReviewData(ReviewContext.getReviewContext())
    }

    useEffect(() => {
        (async function initializeReviews () {
            await ReviewContext.initialize(router.query.id, 2)
            ReviewContext.render()
        })();
    },[])

    const classes = useStyles()

    return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item lg={4} className={classes.gridItem}>
                    <Typography className={classes.text}> Rating </Typography>
                    <ReviewStats className={classes.component} />
                </Grid>
                <Grid item lg={6} className={classes.photoGallery}>
                    <Typography className={classes.text}> Photo Gallery </Typography>

                    <ReviewPhotos className={classes.component}/>
                </Grid>
            </Grid>
    )
}


export default RatingAndPhotos;