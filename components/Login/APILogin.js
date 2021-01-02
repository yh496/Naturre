import { makeStyles, withStyles } from '@material-ui/core/styles';

import APILoginButton from './APILoginButton'

const useStyles = makeStyles((theme) => ({

  divStyle: {
    width: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 80,
    [theme.breakpoints.down(900)]: {
      width: 300
    },
    [theme.breakpoints.down(544)]: {
      width: 250
    },
    [theme.breakpoints.down(355)]: {
      width: 210
    },
  }

}))

export default function APILogin (props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.divStyle}>
        <APILoginButton apiName="Google" />
        <APILoginButton apiName="Facebook" />
      </div>
    </React.Fragment>
  )
}
