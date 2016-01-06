import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import { AddComment, CommentList, Errors, SignIn } from './components';

function routes(auth) {

  function requireAuth(nextState, replaceState) {
    if (!auth.signedIn()) {
      replaceState({nextPathname: nextState.location.pathname}, '/signin')
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

export default routes;
