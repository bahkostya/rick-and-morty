import React from 'react';
import ReactDOM from 'react-dom';
import { QueryParamProvider } from 'use-query-params';

import { App } from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <QueryParamProvider>
      <App />
    </QueryParamProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
