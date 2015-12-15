export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(author, content) {
    return {
        type: ADD_MESSAGE,
        author,
        content
    }
}