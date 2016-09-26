import React, { PropTypes } from 'react';

const Comment = props => (
  <div className="message">
    <h3>{props.content}</h3>
    <p>By {props.author}</p>
  </div>
);

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default Comment;
