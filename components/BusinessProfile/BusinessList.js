import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
    marginBottom: 10,
    marginLeft: 100,
    height: '200px'
  },
  media: {
    height: 200,
  },
});
export default function BusinessList(props) {

  const [businessList, setBusinessList] = useState([])
  const getBusinessProfiles = () => {
    fetch('/api/business-profile/business-list')
      .then(res => res.json()).then(res =>
        setBusinessList(res.data)
      )
  }

  useEffect(() => {
    getBusinessProfiles()
    console.log(businessList)
  }, [])

  const classes = useStyles();
  return (
    <div>
      {businessList.map((biz, i) => (

        <Card className={classes.root}>
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
                  <Typography variant="h5" style={{ color: "blue" }} component="p">
                    {biz.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {biz.description}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      ))}

    </div>

  )
}