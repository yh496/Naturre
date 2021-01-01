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
  const { businessId, businessName, ...rest } = props
  const theme = useTheme();
  const title = 'FAQs'
  const [rating, setRating] = React.useState("5");
  const [comments, setComments] = useState([])
  const [limit, setLimit] = useState(2)

  const [open, setOpen] = React.useState(false)

  const callApi = (limit, businessId) => {
    fetch(`/api/business-profile/business-questions`, {
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
              {limit >= 6 ? 'See all FAQs' : 'Load more ...'}
            </Typography>
          </Button>
          <br />
          <br />
        </div>
      </div>
    </React.Fragment >
  )

}