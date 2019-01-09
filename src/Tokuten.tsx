"use strict";

import * as React from "react";
import { Route, RouteComponentProps } from 'react-router';
import Content from "./Content";

require("./styles/Tokuten.css");

// TODO: Fix this at some point:
// import logo from '../images/logo.svg';
// const logo = require('./images/logo.svg');

class Tokuten extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div className="main">
        <header className="main-header">
          <h1 className="main-title">Tokuten</h1>
        </header>
        <p className="main-intro">Scores and stuff.</p>
        <Route component={Content} />
      </div>
    );
  }
}

export default Tokuten;
