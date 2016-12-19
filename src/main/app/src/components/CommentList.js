/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Comment from './Comment';
import { refreshComments } from '../actions';

import './CommentList.less';

import type { Dispatch } from '../types';

type Props = {
  status: string,
  comments: Array<{
    id: number,
    content: string,
    author: string
  }>,
  dispatch: Dispatch
};

class CommentList extends React.Component {
  props: Props;

  componentDidMount() {
    if (this.props.status === 'stale') {
      this.props.dispatch(refreshComments());
    }
  }

  handleRefreshComments() {
    this.props.dispatch(refreshComments());
  }

  render() {
    return (
      <div className="comments">
        <h1>Messages</h1>
        <div>
          <Link to="/add" className="btn btn-primary">Add Comment</Link>
          {' '}
          <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Refresh</button>
        </div>
        { this.props.comments.length === 0
            ? <p>No comments yet! You could add one&hellip;?</p>
            : this.props.comments.map(each => <Comment author={each.author} content={each.content} key={each.id} />) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.comments.status,
    comments: state.comments.data
  };
}

/* Inject the comments and dispatch() into props */
export default connect(mapStateToProps)(CommentList);
