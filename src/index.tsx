"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Tokuten from './Tokuten';

require('./styles/index.css');

ReactDOM.render(
  <Tokuten />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
