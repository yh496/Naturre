import React from 'react';
import {Card, Paper} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ReviewContext from "../Contexts/ReviewContext";
import {Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    review_content_container: {
        width: '80%',
        margin: 'auto'
    },
    review_title: {
        fontWeight: '560',
        fontSize: '22px',
        marginBottom: '1rem'
    },
    review_content: {
        fontSize: '16px',
        fontWeight: '400',
        marginBottom: '2rem'
    },
    review_description: {
        marginBottm: '2rem'
    }



}))


const ReviewCard = () => {

    const classes = useStyles()

    console.log('helloooo', ReviewContext.getReviewContext().reviewContents)

    return (
        <div>
            {ReviewContext.getReviewContext().reviewContents.map( review => (
                <Paper elevation={2} style={{marginBottom: '2rem'}}> 
                    <Card style={{padding: '3rem 3rem 3rem 3rem'}}>  
                        <div className={classes.review_content_container}> 
                            <Typography className={classes.review_title}>{review.title}</Typography>
                            <Typography className={classes.review_description}>{review.content}</Typography>
                            {review.images.map( (url) => (
                                <img src={url} style={{width: '100px', height: '100px', marginRight: '1rem'}}/>
                            ))}
                        </div>
                    </Card>
                </Paper>
            ))}
           

        </div>
    )
}

export default ReviewCard;