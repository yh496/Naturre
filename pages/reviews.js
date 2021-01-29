import React, {useEffect ,useState} from 'react'
import RatingAndPhotos from "../components/Reviews/RatingAndPhotos";
import ReviewContext from "../components/Contexts/ReviewContext";
import {useRouter} from 'next/router';
import {makeStyles} from "@material-ui/core/styles";
import {
    Typography,
    Divider
} from "@material-ui/core"

import ReviewCard from "../components/Reviews/ReviewCard"


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
        margin: 'auto',
        width: '80%',
        height: '210px',
    },
    text: {
        fontSize: '36px', 
        marginBottom: '3rem',
        fontWeight: '520'
    },
    divider: {
        marginTop: '2rem',
    }

}))


const Reviews = () => {

    const classes= useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.text}> Customer Reviews </Typography>
            <RatingAndPhotos/>
            <Divider className={classes.divider}/>

            <ReviewCard/>
        </div>
    )

}

export default Reviews;