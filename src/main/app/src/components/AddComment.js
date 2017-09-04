// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveComment } from '../actions';

type Props = {
  dispatch: Function,
  history: {
    push: (path: string) => void
  }
};

class AddComment extends React.Component<Props> {
  authorInput : ?HTMLInputElement;
  contextInput: ?HTMLInputElement;

  addComment(author : string, content : string) : void {
    this.props.dispatch(saveComment(author, content));
  }

  onSubmit(e) {
    e.preventDefault();

    const author = this.authorInput;
    const content = this.contextInput;

    if (author && content) {
      this.addComment(author.value.trim(), content.value.trim());
      author.value = '';
      content.value = '';
    }

    this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <h1>Add Comment</h1>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input id="author" className="form-control" type="text" size={50} ref={el => { this.authorInput = el; }} />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input id="comment" className="form-control" type="text" size={50} ref={el => { this.contextInput = el; }} />
        </div>
        <Link to="/" className="btn btn-primary">Back</Link>
        {' '}
        <button className="btn btn-success" type="submit">Submit</button>
      </form>);
  }
}

/* Inject dispatch() but no state into props */
export default withRouter(connect()(AddComment));
