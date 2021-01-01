// import Radium from 'radium'
import { makeStyles, withStyles } from '@material-ui/core/styles';


import {
  FormControl
} from "@material-ui/core"

const useStyles = makeStyles( (theme) => ({

  inputStyle: {
    marginBottom: 20,
    marginTop: 3,
    paddingLeft: 20,
    borderRadius: 18,
    height: 45,
    ':hover': {
      outline: "none"
    },
    borderColor: "#cccccc",
    borderStyle: "solid",
    '&:focus': {
      borderColor: '#64B6AC',
      boxShadow: 'none',
      outline: 'none'
    },
    [theme.breakpoints.down(544)]: {
      height: 40,
      fontSize: '9pt',
      borderRadius: 14
    },
  },

  abbrStyle: {
    textDecoration: 'none',
    display: "inline-block",
  },

  inputLabelStyle: {
    display: "inline-block",
  },

  forgotPasswordLinkStyle: {
    display: "inline-block",
    paddingTop: 2,
    fontSize: 10,
    textAlign: "right",
    color: "#158577",
    width: '82%',
    [theme.breakpoints.down(900)]: {
      width: "78%"
    },
    [theme.breakpoints.down(544)]: {
      width: "73%"
    },
    [theme.breakpoints.down(355)]: {
      width: "68%"
    },
  },

  formControlStyle: {
    width: '100%'
  }

}))

export default function InputField (props) {

  const classes = useStyles();
  // const forgotWidthLength = props.forgotWidthLength

  const forgot = props.forgotPassword;
  let forgotPasswordLink
  if(forgot=="yes"){
    forgotPasswordLink = <a href="#" className={classes.forgotPasswordLinkStyle}>Forgot password?</a>;
  }


  return (
    <React.Fragment>
      <FormControl className={classes.formControlStyle}>
        <div>
          <label className={classes.inputLabelStyle} for = {props.forName}>{props.label}</label>
          <abbr title="required" className={classes.abbrStyle}>*</abbr>
          {forgotPasswordLink}
        </div>
          <input type={props.type} className={classes.inputStyle} placeholder={props.placeHolder} name = {props.forName} required/>
      </FormControl>
    </React.Fragment>
  )
}
