/* @flow */
/* React, browser and server rendering functions. We need the
 * first import as JSX compiled to React.createComponent(...) */
import React from 'react';
import { render as renderToDom } from 'react-dom';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

/* Hot-module reloading */
import { AppContainer } from 'react-hot-loader'

/* State management with redux */
import { Provider } from 'react-redux';

/* Routing with react-router */
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App';

import createStore from './createStore';

/* Client-side rendering. We rehydrate the Redux store and plugin it into the page render.*/
if (typeof window !== 'undefined') {
  // Only create the store once!
  const store = createStore(window.__INITIAL_STATE__);

  const render = Component => {
    const app = (
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </Provider>
      </AppContainer>
    );

    renderToDom(app, document.getElementById('root'));
  }

  render(App);

  // Register with Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./containers/App', () => { render(App) });
  }
}

/**
 * Performs server-side rendering. The function is exported because the templating function
 * that Spring will call uses this function to perform the meat of the rendering.
 *
 * @param path the path to the resource requested by the client
 * @param state the Redux state supplied by Spring and massaged by the template engine
 * @returns string the rendered page
 */
// eslint-disable-next-line import/prefer-default-export
export function renderApp(path : string, state : Object) {
  const store = createStore(state);

  // 404's will be handled by correct route definitions. Redirects will be handled by Spring.
  const markup = renderToString(
    <Provider store={ store }>
      <StaticRouter
        location={ path }
        context={ {} }
      >
        <App/>
      </StaticRouter>
    </Provider>
  )

  // Free accumulated object to avoid memory leak and return data to parent renderer
  const head = Helmet.rewind();

  return { markup, head };
}
