import React, {useEffect, useState} from 'react'
import ReviewStats from '../BusinessProfile/ReviewStats'
import ReviewPhotos from '../Reviews/ReviewPhotos';
import { useRouter } from 'next/router';
import {Grid, Typography,Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ReviewContext from "../Contexts/ReviewContext";

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
        height: '100%',
        width: '100%'
    },
    gridItem: {
        marginRight: '3rem',
        height: '100%'
    },
    text2: {
        color: '#32A482',
        fontSize: '18px',
        lineHeight: '22px',
        textTransform: 'none',
        transform: 'translate(0%,-15%)'
    },
    arrowRightContainer: {
        width: '10px',
        height: '100%',
        margin: 'auto',
        transform: 'translate(-40%, 0%)'

    },
    arrowRight: {
        color: '#000000',
        transform: 'scale(1.5)',
    }

}))


const RatingAndPhotos = () => {
    const classes = useStyles()

    const router = useRouter()

    const [skipCount, setSkipCount] = useState(1)

    return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item lg={4} className={classes.gridItem}>
                    <Typography className={classes.text}> Rating </Typography>
                    <ReviewStats className={classes.component} />
                </Grid>
                <Grid item lg={6} className={classes.photoGallery}>
                    <div style={{display: 'flex', justifyContent: 'left', textAlign: 'left'}}>
                        <Typography className={classes.text}> Photo Gallery </Typography>
                        <Button className={classes.text2}> View all </Button>
                    </div>
                    <div style={{display: 'flex'}}>
                        <ReviewPhotos style={{width: '100%'}}/>
                    </div>
                </Grid>
                <Button
                    className={classes.arrowRightContainer}
                    onClick={async () => {
                        await ReviewContext.fetchReviewImages(router.query.id)
                        ReviewContext.renderReviewImages()
                        const newSkipCount= ReviewContext.getReviewContext().imageSkipCount +=1
                        ReviewContext.setReviewContext('imageSkipCount', newSkipCount)
                    }
                    }
                >
                    <ArrowRightAltIcon color="inherit" className={classes.arrowRight}/>
                </Button>

            </Grid>
    )
}


export default RatingAndPhotos;