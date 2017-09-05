/* @flow */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import type { Store } from './types';

export default function configureStore(initialState : Object) : Store {
  const store = createStore(reducers, initialState, compose(
    // applyMiddleware supercharges createStore with middleware:
    applyMiddleware(thunk),
    // Detect devtools browser extension
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : fn => fn
  ));

  // The Redux store can't be hot-reloaded, but the reducers can and that's
  // what we really want.
  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
}
