import { ADD_COMMENT } from './actions';

function commentsApp(state = {comments: []}, action) {

    switch (action.type) {
        case ADD_COMMENT:
            return {
                comments: [
                    ...state.comments,
                    {
                        id: Date.now(),
                        author: action.author,
                        content: action.content
                    }
                ]
            };

        default:
            return state;
    }
}

// Replace with a combined reducer if necessary. Using a generic
// name allows index.jsx to be less app-specific.
const rootReducer = commentsApp;

export default rootReducer;