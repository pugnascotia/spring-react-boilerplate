/* @flow */
import { combineReducers } from 'redux';
import { ADD_COMMENT, COMMENTS_REFRESHED, AUTHENTICATED, LOGGED_OUT } from './actions';

import type { Action, Comment, Role } from './types';

type CommentsState = {
  status: string,
  data: Comment[]
}

function commentsReducer(state : CommentsState = { status: 'stale', data: [] }, action : Action) : CommentsState {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };

    case COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
}

type AuthState = {
  signedIn: boolean,
  roles: Role[]
};

function authReducer(state : AuthState = { signedIn: false, roles: [] }, action : Action) : AuthState {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        signedIn: true,
        roles: action.roles
      });

    case LOGGED_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

function errorsReducer(state = {} /* , action */) {
  return state;
}

/* Combine the application's reducers */
const reducer = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentsReducer,
  errors: errorsReducer
}));

export default reducer;
