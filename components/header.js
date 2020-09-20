// import styles from '../styles/Header.module.css'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

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
  },
  login: {
    color: 'blue',
    // paddingTop: '15px',
    fontSize: '20px',
    marginTop: '15px',
    margin: 'auto',
    transform: 'translate(60%, 0%)'

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
    transform: 'translate(0%,-10%)'
  }
}));
export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Grid container>

        <Grid item xs={4} className={classes.title}>Naturre</Grid>
        <Grid item xs={5} className={classes.searchBox}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Button className={classes.login}> Login/Register </Button>
         </Grid>


      </Grid>

      {/* <div className={classes.about}>About</div> */}

    </div>
  )
}
