import axios from 'axios';

export const ADD_COMMENT = 'ADD_COMMENT';
export const COMMENTS_REFRESHED = 'COMMENTS_REFRESHED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_OUT = 'LOGGED_OUT';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function saveComment(author, content) {
  return dispatch => {
    axios.post('/api/comments', { author, content })
      .then(
        success => dispatch(addComment(success.data)),
        failure => console.error(failure)
      );
  };
}

export function commentsRefreshed(comments) {
  return {
    type: COMMENTS_REFRESHED,
    comments
  };
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
