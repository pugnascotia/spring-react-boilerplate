import { ADD_MESSAGE } from './actions';

function commentsApp(state = {messages: []}, action) {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                messages: [
                    ...state.messages,
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