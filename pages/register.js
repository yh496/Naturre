import { makeStyles, withStyles } from '@material-ui/core/styles';
import APILogin from '../components/Login/APILogin'
import LoginForm from '../components/Login/LoginForm'


import {
  Typography,
  Button,
  FormControl,
} from "@material-ui/core"


export default function Register() {

    return (
      <React.Fragment>
        <LoginForm formName="signup-request" />
        <APILogin />
      </React.Fragment>
    );
  }
