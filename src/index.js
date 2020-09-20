import React from 'react';
import ReactDOM from 'react-dom';
import { QueryParamProvider } from 'use-query-params';
import { BrowserRouter, Route } from 'react-router-dom';

import { App } from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
