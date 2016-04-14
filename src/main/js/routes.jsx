import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import { AddComment, CommentList, Errors, SignIn } from './components';

function buildRoutes(store) {

  function signedIn() {
    return store.getState().auth.signedIn === true;
  }

  function requireAuth(nextState, replace) {
    if (!signedIn()) {
      replace({
        pathname: '/signin',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={CommentList}/>
      <Route path="add" onEnter={requireAuth} component={AddComment}/>
      <Route path="signin" component={SignIn}/>
      <Route path="*" component={Errors}/>
    </Route>
  );
}

export default buildRoutes;
