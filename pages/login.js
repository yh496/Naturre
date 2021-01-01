// import Radium from 'radium'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import APILogin from '../components/Login/APILogin'
import LoginForm from '../components/Login/LoginForm'

import {
  Typography,
  Button,
  FormControl,
} from "@material-ui/core"

export default function Login() {

    return (
          <React.Fragment>
            <LoginForm formName="login-request" forgotIsTrue="yes" />
            <APILogin widthLength="400px" />
          </React.Fragment>
        );
    }
