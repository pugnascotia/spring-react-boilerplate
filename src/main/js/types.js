/* @flow */
/* eslint no-use-before-define:"off" */

/* Inspired by https://github.com/fbsamples/f8app/blob/master/js/actions/types.js */

export type Comment = { author : string, comment : string };

export type Role =
    'ROLE_ADMIN'
  | 'ROLE_USER'
  | 'ROLE_ANONYMOUS';

export type AuthData = { roles: Role[] };

export type Action =
    { type: 'ADD_COMMENT', comment: Comment }
  | { type: 'COMMENTS_REFRESHED', comments: Comment[] }
  | { type: 'AUTHENTICATED', roles: Role[] }
  | { type: 'LOGGED_OUT' };

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type Store = {
  getState: () => Object
};

export type Router = {
  transitionTo: Function,
  replaceWith: Function,
  blockTransitions: Function,
  createHref: Function
};

export type Auth = {
  roles: String[],
  signedIn: boolean
};
