"use strict";

import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Tokuten from "./Tokuten";

const TokutenRouter = () => (
  <Router>
    <Route path='/' component={Tokuten} />
  </Router>
)

export default TokutenRouter;