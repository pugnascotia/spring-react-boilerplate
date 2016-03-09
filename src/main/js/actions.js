export const SAVE_COMMENT = 'SAVE_COMMENT';
export const ADD_COMMENT  = 'ADD_COMMENT';
export const REFRESH_COMMENTS = 'REFRESH_COMMENTS';
export const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';
export const AUTHENTICATED  = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';

import axios from 'axios';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment: comment
  }
}

export function saveComment(author, content) {
  return dispatch => {
    axios.post('/api/comments', {author, content})
      .then(
        success => dispatch(addComment(success.data)),
        failure => console.error(failure)
      );
    }
}

export function refreshComments() {
  return dispatch => {
    axios.get('/api/comments')
      .then(
        success => dispatch(commentsRefreshed(success.data)),
        failure => console.log(failure)
      );
  };
}

export function commentsRefreshed(comments) {
  return {
    type: COMMENTS_REFRESHED,
    comments
  };
}

export function authenticated(authData) {
  return {
    type: AUTHENTICATED,
    roles: authData.roles
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT
  };
}
