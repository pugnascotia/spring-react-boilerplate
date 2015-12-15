import React, { PropTypes } from 'react';
import Comment from './Comment';

class CommentList extends React.Component {
    render() {
        return (
            <div className="comments">
                <h1>Messages</h1>
                { this.props.comments.map(m => <Comment author={m.author} content={m.content} key={m.id} />) }
            </div>
        );
    }
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        author: PropTypes.string
    }).isRequired).isRequired
};

export default CommentList;