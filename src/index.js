import React from 'react';
import ReactDOM from 'react-dom';

// Pages
import App from './containers/App'; // wrapper
import Album from './containers/Album';

// History without ?_k=
import { Route, Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
  <Router history={appHistory}>
    <Route component={App} path="/">
      <Route path="/album/:album" component={Album}/>
    </Route>
  </Router>,
  document.getElementById('root')
);