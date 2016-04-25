import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Comment from './Comment';
import { refreshComments } from '../actions';

import './CommentList.less';

class CommentList extends React.Component {

  componentDidMount() {
    if (this.props.status === 'stale') {
      this.props.dispatch(refreshComments());
    }
  }

  handleRefreshComments(e) {
    e.preventDefault();
    this.props.dispatch(refreshComments());
  }

  render() {
    return (
      <div className="comments">
        <h1>Messages</h1>
        <div>
          <Link to="/add" className="btn btn-primary">Add Comment</Link>
          {' '}
          <a className="btn btn-default" onClick={(e) => this.handleRefreshComments(e)}>Refresh</a>
        </div>
        { this.props.comments.length === 0
            ? <p>No comments yet! You could add one&hellip;?</p>
            : this.props.comments.map(m => <Comment author={m.author} content={m.content} key={m.id} />) }
      </div>
    );
  }
}

CommentList.propTypes = {
  status: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    author: PropTypes.string
  }).isRequired).isRequired
};

function mapStateToProps(state) {
  return {
    status: state.comments.status,
    comments: state.comments.data
  };
}

/* Inject the comments and dispatch() into props */
export default connect(mapStateToProps)(CommentList);
