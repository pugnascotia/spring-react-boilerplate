import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    // applyMiddleware supercharges createStore with middleware:
    applyMiddleware(thunk),
    // Detect devtools browser extension
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : fn => fn
  ));
  return store;
}
