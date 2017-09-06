/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { refreshComments } from '../data/modules/comments';
import type { Comment as CommentType } from '../data/modules/comments';

import Comment from './Comment';
import './CommentList.less';

type Props = {
  status: string,
  comments: CommentType[],
  refreshComments: () => void
};

class CommentList extends React.Component<Props> {
  componentDidMount() {
    if (this.props.status === 'stale') {
      this.props.refreshComments();
    }
  }

  handleRefreshComments() {
    this.props.refreshComments();
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

export default connect(mapStateToProps, { refreshComments })(CommentList);
