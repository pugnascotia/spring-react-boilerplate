/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router';
import AppMeta from './AppMeta';

import PrivateRoute from './PrivateRoute';
import { AddComment, CommentList, Errors, Navigation, SignIn } from '../components';

const App = () => (
  <div>
    <AppMeta />
    <Navigation />

    <div className="container">
      <Switch>
        <Route exact path="/" component={CommentList} />
        <PrivateRoute path="/add" component={AddComment} />
        <Route path="/signin" component={SignIn} />
        <Route component={Errors} />
      </Switch>
    </div>
  </div>
);

export default App;
