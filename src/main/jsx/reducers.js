import { ADD_COMMENT } from './actions';

function comments(state = [], action) {

    switch (action.type) {
        case ADD_COMMENT:
            return state.concat({
                id: Date.now(),
                author: action.author,
                content: action.content
            });

        default:
            return state;
    }
}

export default comments;