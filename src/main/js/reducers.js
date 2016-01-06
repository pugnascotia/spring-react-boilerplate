import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { ADD_COMMENT, AUTHENTICATED, LOGGED_OUT } from './actions';

function commentsReducer(state = [], action) {

  switch (action.type) {
    case ADD_COMMENT:
      return state.concat(action.comment);

    default:
      return state;
  }
}

function authReducer(state = {signedIn: false, roles: []}, action) {

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

function errorsReducer(state = {} /*, action */) {
  return state;
}

/* Combine the routing reducer with the application's reducer(s) */
const reducer = combineReducers(Object.assign({}, {
  auth: authReducer,
  comments: commentsReducer,
  errors: errorsReducer,
  routing: routeReducer
}));

export default reducer;
