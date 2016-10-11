// @flow
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { router as RouterType } from 'react-router/PropTypes';

import { saveComment } from '../actions';

class AddComment extends React.Component {
  authorInput : HTMLInputElement;
  contextInput: HTMLInputElement;

  addComment(author : string, content : string) : void {
    this.props.dispatch(saveComment(author, content));
  }

  onSubmit(e) {
    e.preventDefault();

    const author = this.authorInput;
    const content = this.contextInput;

    this.addComment(author.value.trim(), content.value.trim());

    author.value = '';
    content.value = '';

    this.context.router.transitionTo('/');
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

AddComment.contextTypes = {
  router: RouterType.isRequired
};

AddComment.propTypes = {
  dispatch: PropTypes.func
};

/* Inject dispatch() but no state into props */
export default connect()(AddComment);
