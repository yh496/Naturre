import React , {useState}from 'react'

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

    const [reviewImages, setReviewImages] = useState([])

    ReviewContext.renderReviewImages = () => {
        setReviewImages(ReviewContext.getReviewContext().reviewImages)
    }

    return (
        <div className={classes.root}>
            {reviewImages.map(obj => (
                <div className={classes.imageContainer}> 
                    <img className={classes.image} src={obj.s3_source}/>
                </div>
            ))}

        </div>
    )
}

export default ReviewPhotos;


