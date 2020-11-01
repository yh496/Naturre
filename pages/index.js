import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RateReviewIcon from '@material-ui/icons/RateReview';
import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles((theme) => ({
  intro: {
    height: '560px',
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#f0f0f5'
  },
  introFont: {
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '40%',
    left: '50%',
    fontFamily:' Mulish',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '44px',
    lineHeight: '56px',
    maxWidth: '730px'
  },
  subIntroFont: {
    maxWidth: '650px',
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    letterSpacing: '0.3px',
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '60%',
    left: '50%',
    color: '#737B7D'
  },
  search: {
    sTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    left: '50%',
    top: '85%'
  },
  searchButton :{
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#FFFFFF',
    background: '#3C64B1',
    height: '38px'
  },
  body1: {
    height: '108px',
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
  },
  body1Font: {
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontFamily:' Mulish',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '32px',
    lineHeight: '40px',
    maxWidth: '920px'
  },
  subbody1Font: {
    maxWidth: '650px',
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    letterSpacing: '0.3px',
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '90%',
    left: '50%',
    color: '#737B7D'
  },
  body2Header: {
    fontFamily:' Mulish',
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
  },
  body2Description: {
    fontFamily:' Mulish',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center',
    maxWidth: '350px',
    margin:'auto'
  },
  body2Button: {
    marginTop: '30px',
    fontFamily:' Mulish',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'center',
    maxWidth: '350px',
    margin:'auto',
    color: '#3C64B1'
  },
  body2Icon: {
    width: '5%',
    height: '200px',
    marginTop: '60px',
    marginBottom:'30px',
    margin:'auto',
    color: '#3C64B1',
    height: '30px',
    transform: 'scale(1.8)',

  }
}));


const GridItems = [
  {
    icon: 'BusinessCenterIcon',
    header: 'Local Contents',
    description: 'Our users can discover unique, local experiences that were difficult to locate before'
  },
  {
    icon: 'RateReviewIcon',
    header: 'Review',
    description: 'Our unique review system empowers actual reviews by real customers'
  },
  {
    icon: 'BuildIcon',
    header: 'Communication',
    description: 'Our user can book directly with Korean shops and enjoy English-friendly communication'
  }
]

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>  
      <div className={classes.intro}>
        <Typography className={classes.introFont}> Your Wellness Journey to Korea at Your Fingertip </Typography>
        <Typography className={classes.subIntroFont}> 
            We help travelers find unique, 
            local businesses for their trips to Korea. 
            You can find a range of shops from beauty to food to nature. 
        </Typography>
        <div className={classes.search}>
          <TextField style={{width: '280px', marginRight: '20px'}} id="outlined-basic" size='small' placeholder="What is your interest?" variant="outlined" />
          <Button variant='outlined' className={classes.searchButton}> Search </Button>
        </div>
      </div>
      <div className={classes.body1}>
        <Typography className={classes.body1Font}> This is your chance to explore local Korea </Typography>
        <Typography className={classes.subbody1Font}> We help small local businesses across Korea </Typography>
      </div>

      <Grid container>
        {GridItems.map( (val, i) => (
          <Grid item lg={4}> 
            <div className={classes.body2Icon}> 
             {val.icon === 'BusinessCenterIcon' ?  
             <BusinessCenterIcon/> 
             : 
             val.icon ==='RateReviewIcon' 
             ? <RateReviewIcon/> 
             : <BuildIcon/>
             }

            </div>
            <Typography className={classes.body2Header}> {val.header} </Typography> 
            <Typography className={classes.body2Description}> {val.description} </Typography> 
            <Typography className={classes.body2Button}> Discover </Typography>
        </Grid> 
        ))}
      </Grid>
    </React.Fragment>
  );
}
