import React from 'react'

import ReviewContext from '../Contexts/ReviewContext';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
       display: "flex",
       justifyContent: "left",
       height: '100%',
    },
    imageContainer: {
        height: '165px',
        background: '#000000',
        position: 'relative',
        marginRight: '2rem',
        width: '165px',

    },
    image: {
        height: '100%',
        display: 'block',
        width: '100%'
      
    }
}))

const ReviewPhotos = () => {
    const classes=useStyles();

    return (
        <div className={classes.root}>
            {ReviewContext.getReviewContext().reviewImageList.map(url => (
                <div className={classes.imageContainer}> 
                    <img className={classes.image} src={url}/>
                </div>
            ))}

        </div>
    )
}

export default ReviewPhotos;


