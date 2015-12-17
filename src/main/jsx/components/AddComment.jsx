import React, { PropTypes } from 'react';
import { IndexLink, PropTypes as RouterPropTypes } from 'react-router';
import { connect } from 'react-redux';

import { saveComment } from '../actions';

class AddComment extends React.Component {

  addComment(author, content) {
    this.props.dispatch(saveComment(author, content));
  }

  handleOnClick() {
    const author = this.refs.author;
    const content = this.refs.content;

    this.addComment(author.value.trim(), content.value.trim());

    author.value = '';
    content.value = '';

    this.context.history.pushState(null, `/`);
  }

  render() {
    return (
      <form>
        <h1>Add Comment</h1>
        <div className="form-group">
          <label>Author:</label>
          <input className="form-control" type="text" size="50" ref="author"/>
        </div>
        <div className="form-group">
          <label>Comment:</label>
          <input className="form-control" type="text" size="50" ref="content"/>
        </div>
        <IndexLink to="/" className="btn btn-primary">Back</IndexLink>
        {' '}
        <button className="btn btn-success" type="submit" onClick={e => this.handleOnClick(e)}>Submit</button>
      </form>);
  }
}

AddComment.contextTypes = { history: RouterPropTypes.history };

/* Inject dispatch() but no state into props */
export default connect()(AddComment);
