import { ADD_MESSAGE } from './actions';

function messagesApp(state = {messages: []}, action) {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                content: [
                    ...state,
                    {
                        author: action.author,
                        content: action.content
                    }
                ]
            };

        default:
            return state;
    }
}

export default messagesApp;