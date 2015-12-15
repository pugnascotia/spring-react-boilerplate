import React from 'react';
import { connect } from 'react-redux'

import { addComment } from '../actions';
import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';

class App extends React.Component {

    render() {
        const { dispatch, comments } = this.props;
        return (
            <div>
                <AddComment onAddComment={(author,content) => dispatch(addComment(author,content))} />
                <CommentList comments={comments} />
            </div>
        );
    }
}

/* Inject the entire state and dispatch() into props */
export default connect(state => state)(App);