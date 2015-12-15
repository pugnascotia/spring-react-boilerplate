export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment(author, content) {
    return {
        type: ADD_COMMENT,
        author,
        content
    }
}