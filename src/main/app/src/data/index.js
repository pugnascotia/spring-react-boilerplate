/* @flow */
import { combineReducers } from 'redux';
import type { Dispatch } from 'redux';

import comments from './modules/comments';
import auth from './modules/auth';

export default combineReducers({
  auth,
  comments
});

export type Thunk<A> = (dispatch: Dispatch<A>, getState: () => Object) => any;
