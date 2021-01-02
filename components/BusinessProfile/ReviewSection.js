import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import ReactCountryFlag from "react-country-flag";

import {
  Typography,
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

export default function CommentSection(props) {
  const { businessId, businessName, ...rest } = props
  const theme = useTheme();
  const title = 'Customer Reviews'
  const [rating, setRating] = React.useState("3.0");
  const [comments, setComments] = useState([])
  const [limit, setLimit] = useState(2)
  const [reviewText, setReviewText] = useState('')
  const [reviewTitle, setReviewTitle] = useState('')
  const [imageFiles, setImageFiles] = useState([])

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
    window.location.reload()
  }

  const callApi = (limit, businessId) => {
    fetch(`/api/business-profile/business-reviews`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: businessId, limit: limit })

    }).then(e => e.json()).then(e => {
      setComments(e.data)
    }
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

  const changeRating = (val) => {
    console.log(val)
    setRating(val)
    console.log(rating)
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
            <Paper style={{ width: "670px", borderRadius: "24px" }}>
              <div className={classes.reviewContent}>
                <div style={{ marginRight: "15px" }}>
                  <img src="https://naturre.s3.ap-northeast-2.amazonaws.com/business/carol.jpeg" width="60px" height="60px" />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "left" }}>
                    <Typography style={{ fontWeight: "350", fontSize: "15px", marginBottom: "10px" }}>Carol Jung</Typography>
                    <ReactCountryFlag countryCode="US" style={{ width: "20px", height: "20px", marginTop: "5px", marginLeft: "3px" }} />
                    <Typography style={{ marginTop: "3px", marginLeft: "auto", fontSize: "24px" }}>{val.rating.toFixed(1)}</Typography>
                    <StarBorderIcon style={{ color: 'black', marginLeft: "5px" }} />
                  </div>
                  <Typography style={{ fontWeight: "400", fontSize: "24px" }}>{val.title}</Typography>
                  <Typography style={{ fontWeight: "370", fontSize: "18px", width: "550px" }}>{val.content}</Typography>
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "left" }}>
                    {val.images.map((image) => (
                      <img src={image} width="60px" height="60px" style={{ marginRight: "10px" }} />
                    ))}
                  </div>
                </div>
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
                  defaultValue={3.0}
                  onChange={(event, val) => {
                    changeRating(val)
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
        </div>
      </div>
    </React.Fragment >
  )

}