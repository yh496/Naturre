import React, {useEffect, useState} from 'react';
import {Card, Paper} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ReviewContext from "../Contexts/ReviewContext";
import {Typography} from "@material-ui/core"
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    card_header_section: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    review_content_container: {
        marginTop: '1.5rem',
        width: '90%',
        margin: 'auto'
    },
    review_rating: {
        color: '#7FD4BB',
        marginBottom: '1rem'
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
        marginBottom: '2rem'
    },
    user_info_container: {
        display: 'flex',
        justifyContent: 'start'
    },
    user_avatar: {
        width: '60px',
        height: '60px',
        borderRadius: '90px'
    },
    user_id: {
        fontSize: '18px',
        lineHeight: '22px',
        fontWeight: 600,
        padding: '8px 0px 5px 12px'

    },
    user_location: {
        fontSize: '14px',
        lineHeight: '17px',
        padding: '0px 0px 0px 12px'
    }

}))


const ReviewCard = () => {

    const classes = useStyles()

    const [reviewContents, setReviewContents] = useState([])

    ReviewContext.renderReviewContents = () => {
        setReviewContents(ReviewContext.getReviewContext().reviewContents)
    }

    return (
        <div>
            {reviewContents.map(review => (
                <Card style={{
                    padding: '3rem 3rem 3rem 3rem',
                    marginBottom: '2rem',
                    border: '1px solid #EAEAEA',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                    borderRadius: '24px'
                }}>
                    <div className={classes.card_header_section}>
                        <div className={classes.user_info_container}>
                            <img className={classes.user_avatar} src={review.user && review.user.avatar || ""}/>
                            <div>
                                <Typography className={classes.user_id}> {review.user.id}</Typography>
                                <Typography className={classes.user_location}> {review.user.location}</Typography>
                            </div>
                        </div>
                        <Typography> {new Date(review.createdAt).toDateString().substr(4, 12)}</Typography>

                    </div>
                    <div className={classes.review_content_container}>
                        <Rating name="read-only" className={classes.review_rating} max={review.rating}
                                value={review.rating} readOnly/>
                        <Typography className={classes.review_title}>{review.title}</Typography>
                        <Typography className={classes.review_description}>{review.content}</Typography>
                        {review.images.map((url) => (
                            <img src={url} style={{width: '100px', height: '100px', marginRight: '1rem'}}/>
                        ))}
                    </div>
                </Card>
            ))}


        </div>
    )
}

export default ReviewCard;