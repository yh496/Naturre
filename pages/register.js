import React, { Component } from "react";

export default class Register extends Component {
    render() {
        return (
          <div class = "wrapper">
            <form id = "signup-request" method = "post" novalidate>
                <h2 className="signup-label">Sign up</h2>

                <p class="account-create">Create an account to receive tailored recommendations and chat with businesses.</p>

                <div className="form-group">
                    <label for = "email">Email address</label>
                    <abbr title="required" className="form-required-input">*</abbr>
                    <input type="email" className="form-control" placeholder="Enter email address" name = "email" id = "email" required/>
                </div>

                <div className="form-group">
                    <label for="password">Create password</label>
                    <abbr title="required" className="form-required-input">*</abbr>
                    <input type="password" className="form-control" placeholder="Password" name = "password" id = "password" required/>
                </div>

                <div className="form-group">
                    <label for="confirm-password">Confirm password</label>
                    <abbr title="required" className="form-required-input">*</abbr>
                    <input type="password" className="form-control" placeholder="Confirm password" name = "confirm-password" id = "confirm-password" required/>
                </div>

                <p class="terms">I have read and agree to the <a href="#">terms & conditions</a>.</p>

                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <p className="form-api-seperator">or</p>

            <div class = "buttons">
              <button type="button" className="btn-block g-signin">Login with Google</button>
              <button type="button" className="btn-block f-signin signup-last-btn">Login with Facebook</button>
            </div>
          </div>
        );
    }
}
