import React, {useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import {Button, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import ReviewImageUpload from "./ReviewImageUpload";
import {useRouter} from "next/router";


const useStyles = makeStyles((theme) => ({
    reviewContainer: {
        marginTop: theme.spacing(3),
        marginLeft: '110px',
        marginBottom: '100px',
    },
    reviewContent: {
        padding: '20px',
        marginBottom: '1rem',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'start'
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


const formContent = [
    {
        id: 'rating',
        label: 'Overall Rating',
    },
    {
        id: 'reviewTitle',
        label: 'Title of Review',
        placeholder: 'Summary of your visit'
    },
    {
        id: 'reviewContent',
        label: 'Review Description',
        placeholder: 'Describe your experience at the venue'
    },
    {
        id: 'imageFiles',
        label: 'Upload Images'
    }
]

const ReviewUploadForm = (props) => {
    const classes = useStyles();

    const router = useRouter()

    const {open, handlePopupClose, businessName} = props

    const [reviewForm, setReviewForm] = useState( {
        reviewContent: "",
        reviewTitle: "",
        imageFiles: null,
        rating: 3
    })

    const uploadImageS3 = async () => {
        let response = await fetch("/api/business-profile/upload-image", {
            method: 'POST',
            body: reviewForm.imageFiles
        })

        response = await response.json()

        return response.s3Sources
    }

    console.log(reviewForm)

    const handleSubmitReview = async()=> {
        let imageS3Sources = await uploadImageS3()

        console.log(reviewForm, reviewForm.reviewTitle)
        let response = await fetch('/api/business-profile/create-review', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: reviewForm.reviewTitle,
                content: reviewForm.reviewContent,
                rating: parseInt(reviewForm.rating),
                businessId: router.query.id,
                images: imageS3Sources
            }),
        })
        let responseJson = await response.json()
        if (responseJson.succeed === false) alert('Error with review upload')
        window.location.reload()
    }

    const setImageFiles = (uploadedImages) => {
        setReviewForm({...reviewForm, imageFiles: uploadedImages})
    }


    return (
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
                {formContent.map( (obj) => (
                    <div
                        key={obj.id}
                    >
                        <DialogContentText
                            style={{ color: "black", fontWeight: "500", fontSize: "18px" }}>{obj.label}</DialogContentText>
                            {obj.id === 'rating' && (
                                <div>
                                    <StyledRating
                                        name="customized-color"
                                        size="large"
                                        defaultValue={3.0}
                                        onChange={(event, val) => {
                                            setReviewForm({...reviewForm, [obj.id]: val})
                                        }}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                        style={{marginBottom: "30px"}}
                                    />
                                </div>
                            )}
                            {obj.id === 'imageFiles' && (
                                <ReviewImageUpload
                                    setImageFiles = {setImageFiles}
                                />
                            )}
                            { (obj.id === 'reviewTitle' || obj.id === 'reviewContent') && (
                                <CustomTextField
                                    onChange={
                                        e => setReviewForm(
                                            {...reviewForm, [obj.id]: e.target.value})
                                    }
                                    multiline
                                    rows={1}
                                    style={{ marginBottom: "20px", width: "500px" }}
                                    label={obj.placeholder}
                                    variant="outlined"
                                />
                            )}
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitReview} color="primary" autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ReviewUploadForm;