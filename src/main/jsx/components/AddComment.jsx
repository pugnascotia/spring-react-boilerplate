import React, { PropTypes } from 'react';
import { IndexLink, PropTypes as RouterPropTypes } from 'react-router';
import { connect } from 'react-redux';

import { addComment } from '../actions';

class AddComment extends React.Component {

  addComment(author, content) {
    this.props.dispatch(addComment(author, content));
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
      <div>
        <h1>Add Comment</h1>
        <div>
          <IndexLink to="/" className="btn btn-primary">Back</IndexLink>
        </div>
        <div>
          <label>Author:</label>
          <input type="text" size="50" ref="author"/>
        </div>
        <div>
          <label>Comment:</label>
          <input type="text" size="50" ref="content"/>
        </div>
        <button type="submit" onClick={e => this.handleOnClick(e)}>Submit</button>
      </div>);
  }
}

AddComment.contextTypes = { history: RouterPropTypes.history };

/* Inject dispatch() but no state into props */
export default connect()(AddComment);
