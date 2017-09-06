// @flow

import axios from 'axios';

export type Comment = {
  id?: number,
  author: string,
  content: string
};

type State = {
  status: 'stale' | 'loaded',
  data: Comment[]
}

type AddCommentAction = {
  type: 'ADD_COMMENT',
  payload: Comment
};

type CommentsRefreshedAction = {
  type: 'COMMENTS_REFRESHED',
  payload: Comment[]
};

type Action = AddCommentAction | CommentsRefreshedAction;

import type { Thunk } from '../';

const defaultState : State = {
  status: 'stale',
  data: []
};

export default function reducer(state : State = defaultState, action : Action) : State {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        status: state.status,
        data: state.data.concat(action.payload)
      };

    case 'COMMENTS_REFRESHED':
      return {
        status: 'loaded',
        data: action.payload
      };

    default:
      return state;
  }
}

export function addComment(comment : Comment) : AddCommentAction {
  return {
    type: 'ADD_COMMENT',
    payload: comment
  };
}

export function saveComment(author : string, content : string) : Thunk<AddCommentAction> {
  return dispatch => {
    axios.post('/api/comments', { author, content })
      .then(
        (success: { data: Comment }) => dispatch(addComment(success.data)),
        // TODO: something more helpful with this failure
        failure => console.error(failure)
      );
  };
}

export function commentsRefreshed(comments : Comment[]) : CommentsRefreshedAction {
  return {
    type: 'COMMENTS_REFRESHED',
    payload: comments
  };
}

export function refreshComments() : Thunk<CommentsRefreshedAction> {
  return dispatch => {
    axios.get('/api/comments')
      .then(
        (success: { data: Comment[] }) => dispatch(commentsRefreshed(success.data)),
        // TODO: something more helpful with this failure
        failure => console.log(failure)
      );
  };
}
