/* React, browser and server rendering functions. We need the
 * first import, even though it isn't explicitly referenced
 * in this file, in order to avoid runtime errors. */
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

/* State management with redux */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers';

/* Routing with react-router */
import { Router, RoutingContext, match } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

/* Link state to route with redux-simple-router */
import { syncReduxAndRouter } from 'redux-simple-router';

/* Our routing rules (actually a function that takes an auth and returns the rules) */
import routes from './routes';

// applyMiddleware supercharges createStore with middleware:
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

if (typeof window !== 'undefined') {

  const store = createStoreWithMiddleware(reducer, window.__INITIAL_STATE__);

  const history = createHistory();

  syncReduxAndRouter(history, store);

  let app = (
    <Provider store={store}>
      <Router history={history}>
        {routes(store)}
      </Router>
    </Provider>
  );

  render(app, document.getElementById('mount'));
}

export function renderApp(path, state) {
  let store = createStoreWithMiddleware(reducer, state);
  let renderResult = '';

  match({ routes: routes(store), location: path }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      renderResult = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );
    }
    else {
      console.error(`Failed to render app for path [${path}], error: [${error}]`);
    }
  });

  return renderResult;
}
