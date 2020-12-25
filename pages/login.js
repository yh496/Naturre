import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
          <div class = "wrapper">
            <form id = "login-request" method = "post" novalidate>
                <h2 className="login-label">LogIn</h2>

                <div className="form-group">
                    <label for = "email">Email address</label>
                    <abbr title="required" className="form-required-input">*</abbr>
                    <input type="email" className="form-control" placeholder="Enter email address" name = "email" id = "email" required/>
                </div>

                <div className="form-group">
                    <label for="password">Password</label>
                    <abbr title="required" className="form-required-input">*</abbr>
                    <p className="forgot-password text-right">
                      <a href="#">Forgot password?</a>
                    </p>
                    <input type="password" className="form-control" placeholder="Enter password" name = "password" id = "password" required/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label remember-me" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <p className="form-api-seperator">or</p>

            <div class = "buttons">
              <button type="button" className="btn-block g-signin">Login with Google</button>
              <button type="button" className="btn-block f-signin">Login with Facebook</button>
            </div>
          </div>
        );
    }
}

  // <div class="g-signin2" data-onsuccess="onSignIn"></div>
