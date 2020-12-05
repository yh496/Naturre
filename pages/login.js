import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
                <h2 className="login-label">LogIn</h2>

                <div className="form-group">
                    <abbr title="required" className="form-required-input">*</abbr>
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email address" required/>
                </div>

                <div className="form-group">
                    <abbr title="required" className="form-required-input">*</abbr>
                    <label>Password</label>
                    <p className="forgot-password text-right">
                      <a href="#">Forgot password?</a>
                    </p>
                    <input type="password" className="form-control" placeholder="Enter password" required/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>

                <p className="form-api-seperator">or</p>
            </form>
        );
    }
}
