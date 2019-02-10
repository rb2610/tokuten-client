"use strict";

import axios from "axios";
import cookie from "cookie";
import React, { Component } from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import Content from "./content/Content";
import AuthContext from "./contexts/AuthContext";
import AuthUser from "./dataTypes/AuthUser";
import LoginForm from "./forms/LoginForm";
import Header from "./Header";
import AuthenticatedRoute from "./routing/AuthenticatedRoute";
import { userCookieMaxAge } from "./util/Constants";

require("./styles/Tokuten.css");

// TODO: Fix this at some point:
// import logo from '../images/logo.svg';
// const logo = require('./images/logo.svg');
type State = {
  authenticatedUser: AuthUser | undefined;
};

const currentUserKey: string = "currentUser";
const unauthorisedHttpStatus: number = 401;

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       // tslint:disable-next-line:no-console
//       console.log("ERROR OH NO");
//     }

//     return Promise.reject(error);
//   }
// );

class Tokuten extends Component<RouteComponentProps, State> {
  public state = {
    authenticatedUser: this.currentUserFromCookies()
  };

  public constructor(props: RouteComponentProps) {
    super(props);

    // TODO: Is this safe to be in constructor?
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response && error.response.status === unauthorisedHttpStatus) {
          this.deauthenticateUser();
        }

        return Promise.reject(error);
      }
    );
  }

  public render() {
    return (
      <AuthContext.Provider
        value={{
          authenticateUser: this.authenticateUser,
          authenticatedUser: this.state.authenticatedUser,
          deauthenticateUser: this.deauthenticateUser
        }}
      >
        <div className="main">
          <Header />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <AuthenticatedRoute path="/" component={Content} />
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }

  private authenticateUser = (user: AuthUser) => {
    document.cookie = cookie.serialize(currentUserKey, JSON.stringify(user), {
      maxAge: userCookieMaxAge
    });
    this.setState({ authenticatedUser: user });
  };

  private deauthenticateUser = () => {
    document.cookie = cookie.serialize(currentUserKey, "");
    this.setState({ authenticatedUser: undefined });
  };

  private currentUserFromCookies(): AuthUser | undefined {
    const currentUserCookie = cookie.parse(document.cookie)[currentUserKey];

    if (currentUserCookie) {
      return JSON.parse(currentUserCookie);
    } else {
      return undefined;
    }
  }
}

export default Tokuten;
