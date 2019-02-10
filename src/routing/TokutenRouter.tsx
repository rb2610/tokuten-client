"use strict";

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Tokuten from "../Tokuten";

const TokutenRouter = () => (
  <Router>
    <Route component={Tokuten} />
  </Router>
)

export default TokutenRouter;