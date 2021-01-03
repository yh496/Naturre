import React, { useEffect, useState, useCallback, useMemo } from 'react'

import {
  Typography,
  Button,
  Paper
} from '@material-ui/core'

import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  reviewContainer: {
    marginTop: theme.spacing(3),
    marginLeft: '110px',
    marginBottom: '100px',
    display: 'flex',
    flexDirection: 'row',
  },
  reviewContent: {
    paddingTop: '10px',
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingBottom: '0px',
    marginBottom: '0px',
    maxHeight: '130px',
    overflow: 'hidden',
  },
  dialogPaper: {
    height: "1310px",
    width: "970px"
  },
  askButton: {
    borderStyle: "solid",
    borderWidth: '1px',
    borderColor:'#64B6AC',
    borderRadius: '15px',
    width: '130px',
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor:'#64B6AC',
      color: 'white'
    },
    textTransform: 'none',
    fontSize: '10pt',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#64B6AC',
    height: '30px'
  },
  helpfulRate: {
    fontSize: '8pt',
    marginRight: '20px',
    marginTop: '5px'

  }

}))

export default function FAQSection(props) {
  const { businessId, businessName, ...rest } = props
  const title = 'FAQs'
  const [comments, setComments] = useState([])
  const [limit, setLimit] = useState(2)


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

  

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h2" style={{ textAlign: 'center', fontWeight: '650' }}> {title} </Typography>

      <div className={classes.reviewContainer}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          {comments.map((val, i) => (
            <Paper style={{marginTop: '15px', borderRadius: 13, borderColor: '#E5E5E5', borderWidth: '1px', borderStyle: 'solid' , boxShadow: '2px 3px 3px #cfc8c8'}}>
              <div className={classes.reviewContent}>
                <Typography variant="h4" style={{ fontWeight: 600, fontSize: 17,  fontFamily: 'Arial' }}> {val.title} </Typography>
                <Typography variant="p"> {val.content} </Typography>
              </div>
              <div style= {{height: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Typography variant="p" className={classes.helpfulRate}>Was this response helpful?</Typography>
                <ThumbUpOutlinedIcon style={{width: '20px', marginRight: '8px'}} />
                <Typography variant='p' style={{fontSize: '8pt', marginRight: '25px', marginTop: '5px'}}>1111</Typography>
              </div>
            </Paper>

          ))}
          <div style={{display: 'flex', flexDirection: 'column', width: "20%", marginLeft: "80%"}}>
            <Button style={{ float: 'right', height: '30px', marginBottom: '8px', marginTop: '10px' }} onClick={() => loadComments()} >
              <Typography
                style={{ color: '#3d8ef2', fontSize: '12px', marginTop: '3px' }}>
                {limit >= 6 ? 'See all FAQs' : 'Load more ...'}
              </Typography>
            </Button>

            <Button className={classes.askButton}>Ask a question</Button>
          </div>

          <br />
          <br />
        </div>

        <div style={{width:'384px', display: 'flex', flexDirection: 'column', marginLeft: '153px'}}>
          <div style={{marginTop: '15px'}}>
            <Typography variant='h4'  style={{ fontWeight: 600, fontSize: '17px',  fontFamily: 'Arial' }}>Making an appointment</Typography>
            <Typography varaint='p'>The shop only accepts online bookings.</Typography>
          </div>
          <div style={{marginTop: '40px'}}>
            <Typography variant='h4'  style={{ fontWeight: 600, fontSize: '17px',  fontFamily: 'Arial' }}>Payment methods</Typography>
            <Typography varaint='p' style={{fontSize: '12px'}}>Cash and credit cards are accepted.</Typography>
          </div>
          <div style={{marginTop: '40px'}}>
            <Typography variant='h4'  style={{ fontWeight: 600, fontSize: '17px',  fontFamily: 'Arial' }}>Getting here</Typography>
            <Typography varaint='p' style={{fontSize: '12px'}}>The nearest train station is XXX station. From there, take bus XXX until XXX stop. Our shop is only 5 minutes walk away.
Click here to view the map</Typography>
          </div>
        </div>

      </div>
    </React.Fragment >
  )

}

// <Button style={{margin: '0px', padding: '0px', width: '10px', marginRight: '8px', justifyContent: 'flex-end'}}>
//   <ThumbUpOutlinedIcon style={{width: '20px'}} />
// </Button>
