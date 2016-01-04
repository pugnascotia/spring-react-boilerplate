import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Comment from './Comment';

class CommentList extends React.Component {
  render() {
    return (
      <div className="comments">
        <h1>Messages</h1>
        <div>
          <Link to="/add">Add Comment</Link>
        </div>
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

/* Inject the entire state and dispatch() into props */
export default connect(state => state)(CommentList);
