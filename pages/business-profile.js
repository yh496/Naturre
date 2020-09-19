import styles from '../styles/Home.module.css'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  content: {
    fontSize: '40px'
  },
 
});

export default function BusinessProfile() {
  const classes = useStyles();
  return (
      <div className={classes.content}><h1>content</h1></div>
  )
}