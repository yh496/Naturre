// import styles from '../styles/Header.module.css'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  Grid,
  Button
}
  from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  header: {
    display: 'inline',
  },
  title: {
    marginTop: '28px',
    marginBottom: '28px',
    marginLeft: '65px'

  },
  logoSection: {
    lineHeight: '32px',
    color: '#3CB148',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '24px',
    fontFamily: 'Lato',

  },
  login: {
    display: 'inline',
    color: '#3C64B1',
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: '700',
    fontFammily: 'Mulish',
    marginRight: '14px'
    
  },
  buttonText: {
    display:'inline',
    alignItems: 'center',
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontSize: '14px',
    fontWeight: '600',
    color: '#373F41',
    marginRight: '30px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  root: {
    padding: '2px 4px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchBox: {
    transform: 'translate(0%,-10%)',
  },
  headerRight: {
    marginLeft: '2%',
    marginTop: '32px',
    marginBottom: '32px'
  },
  signUp: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#FFFFFF',
    background: '#3C64B1',
    height: '35px'
  }
}));
export default function Header() {
  const classes = useStyles();
  return (
      <Grid container style={{backgroundColor: '#e7e6f5'}}> 
        <Grid item xs={1} lg={4} className={classes.title}>
          <Typography className={classes.logoSection}> 
            NATURRE 
          </Typography> 
        </Grid>
        <Grid item xs={6} lg={5} className={classes.headerRight}>    
          <Typography className={classes.buttonText}>  Services </Typography> 
          <Typography className={classes.buttonText}>  About </Typography> 
          <Typography className={classes.buttonText}>  Blog </Typography> 
          <Typography className={classes.buttonText}>  Contact </Typography>       
        </Grid>
        <Grid item  xs={3} lg={2} className={classes.headerRight}>      
          <Typography className={classes.login}> Log in </Typography>
          <Button variant='outlined' className={classes.signUp}> Sign up </Button>
        </Grid> 
      </Grid>
  )
}
