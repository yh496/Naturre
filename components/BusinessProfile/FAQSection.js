import React, { useEffect, useState, useCallback, useMemo } from 'react'

import {
  Typography,
  Button,
  Paper
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

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

export default function CommentSection(props) {
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