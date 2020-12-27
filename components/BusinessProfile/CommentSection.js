import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';


import {
    Typography,
    Grid,
    Box,
    Slider,
    Button,
    Paper
} from '@material-ui/core'

import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    reviewContainer: {
        marginTop: theme.spacing(3),
        marginLeft: '110px',
        marginBottom: '100px',
    },
    reviewContent: {
        padding: '20px',
        marginBottom: '1rem',
        height: '130px',
        maxHeight: '130px',
        overflow: 'hidden',
    }
}))

const StyledRating = withStyles({
    iconFilled: {
        color: '#49AD82',
    },
    iconHover: {
        color: '#49AD82',
    },
})(Rating);


export default function CommentSection(props) {
    const { businessId, businessName, type, ...rest } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const title = (type == 'questions') ? 'FAQs' : 'Customer Reviews'
    const [rating, setRating] = React.useState("5");
    const [comments, setComments] = useState([])
    const [limit, setLimit] = useState(2)
    const [reviewText, setReviewText] = useState('')
    const [reviewTitle, setReviewTitle] = useState('')

    const [open, setOpen] = React.useState(false)

    const handlePopupOpen = () => {
        setOpen(true)
    }
    const handlePopupClose = () => {
        setOpen(false);
    }
    async function handleSubmitReview() {
        console.log(reviewText)
        console.log(reviewTitle)
        console.log(rating)
        const data = { businessId: businessId, title: reviewTitle, content: reviewText, rating: parseInt(rating, 10) };
        fetch('http://localhost:3000/api/business-profile/create-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // browserHistory.push('/business-profile-list');
        // history.push('/business-profile-list');
        //   window.location.href = "/business-profile-list";
        window.location.reload()
    }
    // const handleRatingChange = (val) => {
    //     setRating(val)
    //     console.log(val)
    // }
    // const handleReviewTextChange = (val) => {
    //     setReviewText(val)
    // }
    // const handleReviewTitleChange = (val) => {
    //     setReviewTitle(val)
    // }

    const callApi = (limit, businessId) => {
        fetch(`/api/business-profile/business-${type}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({ id: businessId, limit: limit })

        }).then(e => e.json()).then(e =>
            setComments(e.data)
        )
    }

    useEffect(() => {
        callApi(limit, businessId)
    }, [])

    const loadComments = () => {
        const nextLimit = limit + 2
        callApi(nextLimit, businessId)
        setLimit(nextLimit)
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h2" style={{ textAlign: 'center', fontWeight: '650' }}> {title} </Typography>

            <div className={classes.reviewContainer}>
                <div style={{ width: '50%' }}>
                    {comments.map((val, i) => (
                        <Paper>
                            <div className={classes.reviewContent}>
                                <Typography variant="h4" style={{ fontWeight: 700, fontSize: '15px' }}> {val.title} </Typography>
                                <Typography variant="p"> {val.content} </Typography>
                            </div>
                        </Paper>

                    ))}
                    <Button style={{ float: 'right' }} onClick={() => loadComments()} >
                        <Typography
                            style={{ color: '#3d8ef2', fontSize: '12px' }}>
                            {limit >= 6 ? 'See all reviews' : 'Load more ...'}
                        </Typography>
                    </Button>
                    <br />
                    <br />
                    {(type == 'review') ?
                        <div>
                            <Button style={{ float: "right" }} variant="outlined" color="primary" onClick={handlePopupOpen}>
                                Write Review
                            </Button>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handlePopupClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle style={{ padding: "46px 46px 0px 46px" }} id="responsive - dialog - title">
                                    <Typography style={{ color: "black", fontSize: "26px", fontWeight: "bold" }}>Your review of {businessName}</Typography>
                                </DialogTitle>
                                {/* <h2>Your review of + {businessName}</h2> */}
                                <DialogContent style={{ padding: "36px 46px 36px 46px" }}>
                                    <TextField onChange={e => setReviewTitle(e.target.value)} multiline rows={1} style={{ marginBottom: "20px", width: "200px" }} label="Write a title for your review" variant="outlined" />
                                    <TextField onChange={e => setReviewText(e.target.value)} multiline rows={3} style={{ width: "450px" }} label="Write your review content here..." variant="outlined" />
                                    <br />
                                    {/* <FormControl component="fieldset">
                                        <FormLabel component="legend">Rating</FormLabel>
                                        <RadioGroup row name="gender1" value={rating} onChange={handleRatingChange}>
                                            <FormControlLabel value="1" control={<Radio />} label="1" />
                                            <FormControlLabel value="2" control={<Radio />} label="2" />
                                            <FormControlLabel value="3" control={<Radio />} label="3" />
                                            <FormControlLabel value="4" control={<Radio />} label="4" />
                                            <FormControlLabel value="5" control={<Radio />} label="5" />
                                        </RadioGroup>
                                    </FormControl> */}
                                    {/* <Rating
                                        size="large"
                                        color="green"
                                        name="customized-empty"
                                        defaultValue={3}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon color="green" fontSize="inherit" />}
                                    /> */}
                                    <StyledRating
                                        name="customized-color"
                                        size="large"
                                        defaultValue={2}
                                        onChange={(event, val) => {
                                            setRating(val)
                                        }}
                                        //   getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleSubmitReview} color="primary" autoFocus>
                                        Submit
                                    </Button>
                                </DialogActions>

                            </Dialog>
                        </div>
                        : null}

                </div>
            </div>
        </React.Fragment >
    )

}