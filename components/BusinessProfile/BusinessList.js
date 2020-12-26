import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Card, CardActionArea, CardContent, CardMedia, Button, 
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import MapContext from '../Contexts/MapContext';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  card: {
    maxWidth: '100%',
    marginBottom: 10,
    height: '180px',
    borderRadius: '20px',
    marginTop: '20px',
    boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.1)',

  },
  media: {
    height: 200,
  }
}));
export default function BusinessList(props) {

  const classes=useStyles();

  return (
    <div className={classes.root} key={MapContext.getMapContext().businessList}>
          {MapContext.getMapContext().businessList && MapContext.getMapContext().businessList.map((biz, i) => (
            <Card className={classes.card} key={i}>
              <Link
                href={{
                  pathname: '/business-profile',
                  query: { id: biz._id }
                }}
              >
                <CardActionArea>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardMedia
                        className={classes.media}
                        image={biz.mainImage}
                        title="Contemplative Reptile"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                          {biz.name}
                        </Typography>
                        <Typography variant="h5" style={{ color: "#49AD82" }} component="p">
                          {biz.location.address}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {biz.description}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Link>
            </Card>
          ))
          }



    </div >

  )
}