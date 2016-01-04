import React, { PropTypes } from 'react';

class Comment extends React.Component {

    render() {
        return (
            <div className="message">
                <h3>{this.props.content}</h3>
                <p>By {this.props.author}</p>
            </div>
        );
    }
}

Comment.propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default Comment;