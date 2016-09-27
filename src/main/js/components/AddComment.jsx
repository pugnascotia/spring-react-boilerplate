// @flow
import React, { PropTypes } from 'react';
import { IndexLink, routerShape } from 'react-router';
import { connect } from 'react-redux';

import { saveComment } from '../actions';

class AddComment extends React.Component {
  authorInput : HTMLInputElement;
  contextInput: HTMLInputElement;

  addComment(author : string, content : string) : void {
    this.props.dispatch(saveComment(author, content));
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const author = this.authorInput;
    const content = this.contextInput;

    this.addComment(author.value.trim(), content.value.trim());

    author.value = '';
    content.value = '';

    this.context.router.push('/');
  }

  render() {
    return (
      <form onSubmit={e => this.handleOnSubmit(e)}>
        <h1>Add Comment</h1>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input input="author" className="form-control" type="text" size={50} ref={el => { this.authorInput = el; }} />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input id="comment" className="form-control" type="text" size={50} ref={el => { this.contextInput = el; }} />
        </div>
        <IndexLink to="/" className="btn btn-primary">Back</IndexLink>
        {' '}
        <button className="btn btn-success" type="submit">Submit</button>
      </form>);
  }
}

AddComment.contextTypes = { router: routerShape.isRequired };

AddComment.propTypes = {
  dispatch: PropTypes.func
};

/* Inject dispatch() but no state into props */
export default connect()(AddComment);
