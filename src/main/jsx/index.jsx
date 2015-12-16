/* React, browser and server rendering functions. We need the
 * first import, even though it isn't explicitly referenced
 * in this file, in order to avoid runtime errors. */
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

/* State management with redux */
import { compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import comments from './reducers';

/* Routing with react-router */
import { Router, Route, IndexRoute, RoutingContext, match } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

/* Link state to route with redux-simple-router */
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

/* Our routing rules */
import routes from './routes';


/* Combine the routing reducer with the application's reducer(s) */
const finalReducer = combineReducers(Object.assign({}, {
    comments,
    routing: routeReducer
}));

if (typeof window !== 'undefined') {

    /* Create our redux store using the final reducer from above */
    const store = createStore(finalReducer, __INITIAL_STATE__);

    const history = createHistory();

    syncReduxAndRouter(history, store);

    let app = (
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    );

    render(app, document.getElementById('mount'));
}

export function renderApp(path, state) {
    let store = createStore(finalReducer, state);
    let renderResult = '';

    match({ routes, location: path }, (error, redirectLocation, renderProps) => {
        renderResult = renderToString(
            <Provider store={store}>
                <RoutingContext {...renderProps} />
            </Provider>
        );
    });

    return renderResult;
}