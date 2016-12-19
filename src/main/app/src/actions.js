/* @flow */
import axios from 'axios';

import type { Action, AuthData, Comment, ThunkAction } from './types';

export const ADD_COMMENT = 'ADD_COMMENT';
export const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';

export function addComment(comment : Comment) : Action {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function saveComment(author : string, content : string) : ThunkAction {
  return dispatch => {
    axios.post('/api/comments', { author, content })
      .then(
        success => dispatch(addComment(success.data)),
        failure => console.error(failure)
      );
  };
}

export function commentsRefreshed(comments : Comment[]) : Action {
  return {
    type: COMMENTS_REFRESHED,
    comments
  };
}

export function refreshComments() : ThunkAction {
  return dispatch => {
    axios.get('/api/comments')
      .then(
        success => dispatch(commentsRefreshed(success.data)),
        failure => console.log(failure)
      );
  };
}

export function authenticated(authData : AuthData) : Action {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
}

export function loggedOut() : Action {
  return {
    type: LOGGED_OUT
  };
}
