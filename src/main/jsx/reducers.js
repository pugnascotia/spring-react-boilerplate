import { ADD_COMMENT } from './actions';

function comments(state = [], action) {

  switch (action.type) {
    case ADD_COMMENT:
      return state.concat(action.comment);

    default:
      return state;
  }
}

export default comments;
