// import styles from '../styles/Header.module.css'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

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
    color: '#49AD82',
    marginLeft: '40px',
    paddingTop: '10px',
    fontSize: '34px',
    fontWeight: 'bold',
    transform: 'translate(0%,10%)',
    float: 'left',
    marginTop: '5px',
    marginBottom: '5px',
  },
  login: {
    color: 'grey',
    fontSize: '16px',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '20px',
    fontWeight: '550',
  },
  buttonText: {
    fontSize: '16px',
    marginLeft: '20px',
    fontWeight: '550',
    marginTop: '5px',
    marginBottom: '5px',
    color: '#5A5A5A'
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
    float: 'right',
    marginRight: '60px'
  }
}));
export default function Header() {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: '#FAFFFF', overflow: 'hidden' }}>
      <div className={classes.title}>NATURRE</div>
      <div className={classes.headerRight}>
        <Button className={classes.buttonText}> About </Button>
        <Button className={classes.buttonText}> Blog </Button>
        <Button className={classes.buttonText}> Contact </Button>
        <Button className={classes.login}> Login </Button>
        <Button className={classes.login}> Signup </Button>
      </div>
    </div>
  )
}
