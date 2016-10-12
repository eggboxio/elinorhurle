import React from 'react';
import ReactDOM from 'react-dom';

// Pages
import App from './containers/App'; // wrapper
import Albums from './containers/Albums';

// History without ?_k=
import { Route, Router, useRouterHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
  <Router history={appHistory}>
    <Route component={App} path="/">
      <IndexRoute component={Albums}/>
      <Route path="/album/:album" component={Albums}/>
    </Route>
  </Router>,
  document.getElementById('root')
);