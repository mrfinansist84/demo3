import React, { Component } from 'react';
import "./scss/SignIn.scss";

export default class SignInAdmin extends Component {
  handlerSignIn(e) {
    e.preventDefault();
    this.props.handlerSignIn(this.props.authAdmin);
  }
  render() {
    return (
      <div className="container-signin">
        <div className="main-form-container">
          <div className="left-side"><span>Admin</span>
            <span>Sign in</span></div>
          <div className="right-side">
            <form className="form"
              onSubmit={this.handlerSignIn.bind(this)} noValidate>
              <div>
                <label className="cSignInAdminLabel">Admin`s E-mail:
          <input type="email" name="user_mail" className="signin-input email" />
                </label>
              </div>

              <div>
                <label className="cSignInAdminLabel">Admin`s Password:
          <input type="password" name="pass" className="signin-input password" />
                </label>
              </div>
              <button type="submit" className="cSignInAdminBtn">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
