import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  Button
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({

  otherSigninButton: {
    backgroundColor: 'white',
    borderColor: 'white',
    boxShadow: '3px 5px 5px #d7d7c7',
    display: "block",
    fontWeight: "500",
    borderStyle: 'none',
    marginTop: 20,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
    color: 'black',
    width: '100%',
    height: 45,
    borderRadius: 11,
    textTransform: "none",
    '&:hover': {
      backgroundColor: '#64B6AC',
      borderColor: '#64B6AC',
      color: 'white'
    },
    [theme.breakpoints.down(544)]: {
      height: 40,
      fontSize: '9pt',
      borderRadius: 6
    },
  },

  googleIconStyle: {
    height: 20,
    transform: 'translate(-50px, 1px)',
    position: 'absolute',
    [theme.breakpoints.down(355)]: {
      transform: 'translate(-35px, 1px)'
    },
  },

  facebookIconStyle: {
    height: 20,
    // transform: 'translate(-57px, -15px)',
    transform: 'translate(-38px, 1px)',
    position: 'absolute',
    [theme.breakpoints.down(355)]: {
      transform: 'translate(-25px, -1px)'
    },
  },

  otherSigninButtonLabelStyle: {
    display: 'inline',
    width: '100%'
  }

}))

export default function APILoginButton (props) {

  const classes = useStyles();

  let img;
  if(props.apiName=="Google") {
    img = <img src= '/g_logo_1.png' className={classes.googleIconStyle} />
  }
  if(props.apiName=="Facebook") {
    img = <img src= '/f_logo_1.png' className={classes.facebookIconStyle} />
  }

  return (
    <React.Fragment>
      <Button className={classes.otherSigninButton}>{img}<p className={classes.otherSigninButtonLabelStyle} >Login with {props.apiName}</p></Button>
    </React.Fragment>
  )

}
