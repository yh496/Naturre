// import styles from '../styles/Header.module.css'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link'


import { 
  Grid,
  Button } 
from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  header: {
    display: 'inline'
  },
  title: {
    color: 'blue',
    paddingLeft: '30px',
    paddingTop: '20px',
    fontSize: '40px',
    fontWeight: 'bold',
    transform: 'translate(0%,10%)',
  },
  login: {
    color: 'grey',
    // paddingTop: '15px',
    fontSize: '16px',
    marginTop: '15px',
    marginLeft: '20px',
    fontWeight: '550'

  },
  buttonText: {
    fontSize: '16px',
    marginTop: '15px',
    marginLeft: '20px',
    fontWeight: '550'
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
  }
}));
export default function Header() {
  const classes = useStyles();
  return (
    <Paper elevation={1} style={{background:'#e6e9ed'}}>  
    <div className={classes.header}>
      <Grid container>
        <Grid item xs={2} className={classes.title}>Naturre</Grid>
        <Grid item xs={6} className={classes.searchBox}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.buttonText}> About </Button>
          <Button className={classes.buttonText}> 
            <Link href='/blog/posts'>
              <a> Blog </a>
            </Link>
          </Button>
          <Button className={classes.buttonText}> Contact </Button>
          <Button className={classes.login}> Login </Button>
          <Button className={classes.login}> Signup </Button>
         </Grid>
      </Grid>
    </div>
    </Paper> 
  )
}
