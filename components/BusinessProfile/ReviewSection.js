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
import ReviewUploadForm from "../Reviews/ReviewUploadForm";

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

export default function ReviewSection(props) {
  const { businessId, businessName, ...rest } = props
  const title = 'Customer Reviews'
  const [rating, setRating] = React.useState("3.0");
  const [comments, setComments] = useState([])
  const [limit, setLimit] = useState(2)


  const [open, setOpen] = React.useState(false)

  const handlePopupOpen = () => {
    setOpen(true)
  }
  const handlePopupClose = () => {
    setOpen(false);
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
                    {val.images && val.images.map((image) => (
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
            <ReviewUploadForm
                open={open}
                handlePopupClose ={handlePopupClose}
                businessName = {businessName}
            />

          </div>
        </div>
      </div>
    </React.Fragment >
  )

}