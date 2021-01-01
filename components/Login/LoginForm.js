import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  Typography
} from "@material-ui/core"
import InputField from './InputField'
// import { createMuiTheme } from "@material-ui/core/styles";
//
// const theme = createMuiTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 355,
//       md: 544,
//       lg: 900,
//       xl: 1920
//     }
//   }
// });


const useStyles = makeStyles( (theme) => ({

  formStyle: {
    width: 400,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    marginBottom: 20,
    [theme.breakpoints.down(900)]: {
      width: 300
    },
    [theme.breakpoints.down(544)]: {
      width: 250,
      marginTop: 30
    },
    [theme.breakpoints.down(355)]: {
      width: 210,
      marginTop: 14
    },
  },

  titleStyle: {
    fontWeight: "bold",
    fontSize: "30pt",
    [theme.breakpoints.down(900)]: {
      fontSize: "26pt"
    },
  },

  submitButtonStyle: {
    backgroundColor: '#64B6AC',
    borderColor: '#64B6AC',
    fontWeight: "500",
    borderStyle: 'none',
    marginTop: 17,
    color: 'white',
    width: '100%',
    height: 45,
    borderRadius: 18,
    textTransform: "none",
    '&:hover': {
      backgroundColor: '#2c988b',
      borderColor: '#2c988b'
    },
    [theme.breakpoints.down(544)]: {
      height: 40,
      fontSize: '9pt',
      borderRadius: 14
    },
  },

  apiSeperatorStyle: {
    fontSize: "10pt",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  },

  emailDivStyle1: {
    marginTop: 26,
    width: '100%'
  },

  emailDivStyle2: {
    marginTop: 7,
    width: '100%'
  },

  rememberMeCheckboxLabelStyle: {
    display: 'inline-block',
    transform: 'translate(0px, -2px)',
    marginLeft: 3
  },

  termsCheckboxLabelStyle: {
    display: 'inline-block',
    transform: 'translate(0px, -2px)',
    marginLeft: 3,
    [theme.breakpoints.down(544)]: {
      fontSize: '8pt',
      transform: 'translate(0px, -2.5px)',
    },
    [theme.breakpoints.down(355)]: {
      display: "inline"
    },
  }

}))

export default function LoginForm (props) {

  const classes = useStyles();

  let accountCreateText;
  let emailDivStyle;
  let confirmPassword;
  let checkboxText;
  let checkboxName;
  let title;
  if(props.formName == "signup-request") {
    title = "Sign up"
    accountCreateText = <p class="account-create" style={{marginTop: 25, color:'#8692A6'}}>Create an account to receive tailored recommendations and chat with businesses.</p>
    emailDivStyle = classes.emailDivStyle2
    confirmPassword = <InputField type="password" forName="confirm-password" label="Confirm password" placeHolder="Confirm password" />
    checkboxName = "terms-check"
    checkboxText = <label htmlFor={checkboxName} className={classes.termsCheckboxLabelStyle}>I have read and agree to the <a href="#" style={{color: '#158577'}}>terms & conditions</a>.</label>
  } else {
    title = "LogIn"
    emailDivStyle = classes.emailDivStyle1
    checkboxName = "remember-me"
    checkboxText = <label className={classes.rememberMeCheckboxLabelStyle} htmlFor={checkboxName}>Remember me</label>
  }

  return(
    <React.Fragment>
      <form id = {props.formName} method = "post" className={classes.formStyle} novalidate>
          <Typography variant="h2" className={classes.titleStyle}>{title}</Typography>

          {accountCreateText}

          <div className={emailDivStyle}>
            <InputField type="email" label="Email address" placeHolder="Enter email address"/>
          </div>

          <InputField type="password" label="Password" placeHolder="Enter password" forgotPassword={props.forgotIsTrue}/>

          {confirmPassword}

          <FormControl className="form-group">
              <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id={checkboxName} name={checkboxName} />
                  {checkboxText}
              </div>
          </FormControl>

          <Button type="submit" className={classes.submitButtonStyle}>Login</Button>
      </form>
      <p className="form-api-seperator" className={classes.apiSeperatorStyle}>or</p>
    </React.Fragment>
  )
}

// function formValidation() {
//
// }
