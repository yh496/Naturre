import React, { useEffect, useState, useCallback, useMemo } from 'react'
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
import { useDropzone } from 'react-dropzone';
import axios from "axios";

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
    },
    dialogPaper: {
        height: "1310px",
        width: "970px"
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

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: "18px"
            },
        },
    }
})(TextField);

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
    const [imageFiles, setImageFiles] = useState('')
    const [imageURLs, setImageURLs] = useState('')

    const [open, setOpen] = React.useState(false)

    const handlePopupOpen = () => {
        setOpen(true)
    }
    const handlePopupClose = () => {
        setOpen(false);
    }

    async function uploadImage(file) {
        let fileParts = file.name.split('.');
        const fileName = fileParts[0];
        const fileType = fileParts[1];
        const res = await axios.post("http://localhost:3000/api/business-profile/upload-image", {
            fileName: fileName,
            fileType: fileType
        })
        const returnData = res.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        await fetch(signedRequest, { method: "PUT", body: file })
    }

    async function handleSubmitReview() {
        // console.log(reviewText)
        // console.log(reviewTitle)
        // console.log(rating)
        const imageURLs = []
        await imageFiles.forEach((imageFile) => {
            uploadImage(imageFile)
            const fileName = imageFile.name.split('.')[0];
            const imageURL = `https://naturre.s3.ap-northeast-2.amazonaws.com/business/${fileName}`
            imageURLs.push(imageURL)
        })
        const data = { businessId: businessId, title: reviewTitle, content: reviewText, rating: parseInt(rating, 10), images: imageURLs };
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
        // window.location.reload()
    }

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

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setImageFiles(acceptedFiles)
        console.log(imageFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const dropzoneStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

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
                                classes={{ paper: classes.dialogPaper }}
                                open={open}
                                onClose={handlePopupClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle style={{ padding: "46px 46px 0px 46px" }} id="responsive - dialog - title">
                                    <Typography style={{ color: "black", fontSize: "26px", fontWeight: "bold" }}>Your review of {businessName}</Typography>
                                </DialogTitle>
                                <DialogContent style={{ padding: "36px 46px 36px 46px" }}>
                                    <DialogContentText style={{ color: "black", fontWeight: "500", fontSize: "18px" }}>Overall Rating</DialogContentText>
                                    <StyledRating
                                        name="customized-color"
                                        size="large"
                                        defaultValue={3}
                                        onChange={(event, val) => {
                                            setRating(val)
                                        }}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        style={{ marginBottom: "30px" }}
                                    />
                                    <br />
                                    <DialogContentText style={{ color: "black", fontWeight: "500", fontSize: "18px" }}>Title of Review</DialogContentText>
                                    <CustomTextField onChange={e => setReviewTitle(e.target.value)} multiline rows={1} style={{ marginBottom: "20px", width: "500px" }} label="Summary of your visit" variant="outlined" />
                                    <DialogContentText style={{ color: "black", fontWeight: "500", fontSize: "18px" }}>Review Description</DialogContentText>
                                    <CustomTextField onChange={e => setReviewText(e.target.value)} multiline rows={5} style={{ marginBottom: "20px", width: "500px" }} label="Describe your experience at the venue" variant="outlined" />
                                    <DialogContentText style={{ color: "black", fontWeight: "500", fontSize: "18px" }}>Upload Images</DialogContentText>
                                    <div {...getRootProps()} style={dropzoneStyle}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <h2>Drop the files here...</h2> :
                                                <h2>Drop image files here...</h2>
                                        }
                                    </div>
                                    <br />

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