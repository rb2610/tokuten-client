"use strict";

import axios from "axios";
import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import AuthContext from "../contexts/AuthContext";
import AuthUser from "../dataTypes/AuthUser";
import { apiUrl } from "../util/Constants";
import { onFormFieldChange } from '../util/Functions';

type State = {
  errorMessage: string;
  formPassword: string;
  formUsername: string;
  redirectToReferrer: boolean;
};

class LoginForm extends Component<RouteComponentProps, State> {
  public state = {
    errorMessage: "",
    formPassword: "",
    formUsername: "",
    redirectToReferrer: false
  };

  public render() {
    // TODO: Add check for location state of /login
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    return (
      <AuthContext.Consumer>
        {({ authenticatedUser, authenticateUser }) =>
          this.state.redirectToReferrer || authenticatedUser ? (
            <Redirect to={from} />
          ) : (
            <form onSubmit={this.onLoginSubmit(authenticateUser)}>
              <br />
              {this.state.errorMessage ? (
                <div>
                  <span className="error-message">
                    {this.state.errorMessage}
                  </span>
                  <br />
                  <br />
                </div>
              ) : (
                ""
              )}
              <input
                id="login-username-field"
                type="text"
                value={this.state.formUsername}
                placeholder="Username"
                onChange={onFormFieldChange(this, "formUsername")}
              />
              <br />
              <input
                id="login-password-field"
                type="password"
                value={this.state.formPassword}
                placeholder="Password"
                  onChange={onFormFieldChange(this, "formPassword")}
              />
              <br />
              <input id="login-submit" type="submit" value="Login" />
            </form>
          )
        }
      </AuthContext.Consumer>
    );
  }

  // TODO: Genericise these into a util: onFormFieldChange(event: ChangeEvent<HTMLInputElement>, fieldname: string)
  /* private onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({ formUsername: event.target.value });
    }
  }; */

  /* private onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      this.setState({ formPassword: event.target.value });
    }
  }; */

  private onLoginSubmit = (callback: (authUser: AuthUser) => any) => (
    event: any
  ) => {
    event.preventDefault();
    axios
      .post(
        `${apiUrl}/auth/login`,
        {
          password: this.state.formPassword,
          username: this.state.formUsername
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            errorMessage: "",
            formPassword: "",
            formUsername: ""
          });

          this.setState({ redirectToReferrer: true });
          callback({ username: response.data.user.username });
        } else {
          this.setState({ errorMessage: "Login Error", formPassword: "" });
        }
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 404) {
          this.setState({
            errorMessage: "Username or password is incorrect",
            formPassword: ""
          });
        } else {
          this.setState({
            errorMessage: error.toString(),
            formPassword: ""
          });
        }
      });
  };
}

export default LoginForm;
