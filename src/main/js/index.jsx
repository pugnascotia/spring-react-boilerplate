/* React, browser and server rendering functions. We need the
 * first import, even though it isn't explicitly referenced
 * in this file, in order to avoid runtime errors. */
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

/* State management with redux */
import createStore from './store';
import { Provider } from 'react-redux'

/* Routing with react-router */
import { Router, RouterContext, match } from 'react-router';
import { browserHistory } from 'react-router'

/* Link state to route with react-router-redux */
import { syncHistoryWithStore } from 'react-router-redux';

/* Our routing rules (actually a function that takes an auth and returns the rules) */
import buildRoutes from './routes';

if (typeof window !== 'undefined') {

  const store = createStore(window.__INITIAL_STATE__);

  const history = syncHistoryWithStore(browserHistory, store);

  let app = (
    <Provider store={store}>
      <Router history={history}>
        {buildRoutes(store)}
      </Router>
    </Provider>
  );

  render(app, document.getElementById('mount'));
}
else {
  // When running in Nashorn, the process object doesn't exist. Define it
  // so that when the React code tests for production mode, it succeeds.
  process = {
    env: {
      NODE_ENV: 'production'
    }
  };
}

export function renderApp(path, state) : string {
  const store = createStore(state);
  let renderResult = '';

  match({ routes: buildRoutes(store), location: path }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      renderResult = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
    }
    else {
      console.error(`Failed to render app for path [${path}], error: [${error}]`);
    }
  });

  return renderResult;
}
