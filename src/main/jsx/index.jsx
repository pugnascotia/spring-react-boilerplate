import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers';

import App from './containers/App';

function buildAppComponent(state) {
    let store = createStore(rootReducer, state);
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

if (typeof window !== 'undefined') {
    let state = __INITIAL_STATE__ || {};
    render(buildAppComponent(state), document.getElementById('app'));
}

export function renderApp(state) {
    return renderToString(buildAppComponent(state));
}