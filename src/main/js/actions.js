export const SAVE_COMMENT = 'SAVE_COMMENT';
export const ADD_COMMENT  = 'ADD_COMMENT';
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
  return (dispatch,getState) => {
    axios.post('/api/add', {author, content})
      .then(
        success => dispatch(addComment(success.data)),
        failure => console.error(failure)
      );
    }
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
