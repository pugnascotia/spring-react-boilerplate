/* @flow */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import type { Store } from './types';

export default function configureStore(initialState : Object) : Store {
  const store = createStore(reducer, initialState, compose(
    // applyMiddleware supercharges createStore with middleware:
    applyMiddleware(thunk),
    // Detect devtools browser extension
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : fn => fn
  ));
  return store;
}
