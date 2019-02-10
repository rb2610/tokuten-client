"use strict";

import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import TokutenRouter from "./routing/TokutenRouter";

require("./styles/index.css");

ReactDOM.render(<TokutenRouter />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
