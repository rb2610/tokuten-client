"use strict";

import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import TokutenRouter from "./TokutenRouter";

require("./styles/index.css");

ReactDOM.render(<TokutenRouter />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
