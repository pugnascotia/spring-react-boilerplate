/* @flow */

import React from 'react';
import { Match, Miss } from 'react-router';

import MatchWhenAuthorized from './MatchWhenAuthorized';
import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import Errors from '../components/Errors';
import Navigation from '../components/Navigation';
import SignIn from '../components/SignIn';

const App = () => (
  <div>
    <Navigation />

    <div className="container">
      <Match exactly pattern="/" component={CommentList} />
      <MatchWhenAuthorized pattern="/add" component={AddComment} />
      <Match pattern="/signin" component={SignIn} />
      <Miss component={Errors} />
    </div>
  </div>
);

export default App;
