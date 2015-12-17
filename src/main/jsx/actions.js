export const SAVE_COMMENT = 'SAVE_COMMENT';
export const ADD_COMMENT  = 'ADD_COMMENT';

import axios from 'axios';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment: comment
  }
}

export function saveComment(author, content) {
  return dispatch =>
    axios.post('/api/add', {author, content})
      .then(response => {
        dispatch(addComment(response.data));
      });
}
