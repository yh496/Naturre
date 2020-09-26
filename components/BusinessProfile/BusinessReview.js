import React, { useEffect, useState } from 'react'
import {
    Typography,
    Grid,
    Box,
    Slider,
    Button
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import ReviewStats from './ReviewStats'

const PrettoSlider = withStyles({
    root: {
        color: 'blue',
        height: 1,
        width: '300px',
    },
    thumb: {
        width: 0,
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
        marginTop: theme.spacing(3),
        marginLeft: '115px',
        marginBottom: '100px',
        width: '500px'
    },
}))


export default function BusinessReview(props) {

    const [reviews, setReviews] = useState([])
    const [limit, setLimit] = useState(2)

    const callApi = (limit) => {
        fetch('/api/business-profile/business-review', {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({ id: '5f66f686f6dddb007ba26307', limit: limit })

        }).then(e => e.json()).then(e =>
            setReviews(e.reviews)
        )
    }

    useEffect(() => {
        callApi(limit)
    }, [])

    const loadComments = () => {
        const nextLimit = limit + 2
        callApi(nextLimit)
        setLimit(nextLimit)
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <ReviewStats />
            <div className={classes.reviewContainer}>
                <div style={{ width: '500px' }}>
                    {reviews.map((val, i) => (
                        <div style={{ marginBottom: '20px' }}>
                            <Typography variant="h4" style={{ fontWeight: 700, fontSize: '15px' }}> {val.title} </Typography>
                            <Typography variant="p"> {val.content} </Typography>
                        </div>
                    ))}
                </div>
                <div>
                    <Button style={{ float: 'right' }} onClick={() => loadComments()} >
                        <Typography
                            style={{ color: '#3d8ef2', fontSize: '12px' }}>
                            {limit >= 6 ? 'See all reviews' : 'Load more ...'}
                        </Typography>
                    </Button>

                </div>
            </div>
        </React.Fragment>
    )

}