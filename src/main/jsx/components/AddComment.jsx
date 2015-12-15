import React, { PropTypes } from 'react';

class AddComment extends React.Component {

    handleOnClick() {
        const author = this.refs.author;
        const content = this.refs.content;

        this.props.onAddComment(author.value.trim(), content.value.trim());

        author.value = '';
        content.value = '';
    }

    render() {
        return (
            <div>
                <label>Author:</label>
                <input type="text" size="50" ref="author"/>
                <label>Comment:</label>
                <input type="text" size="50" ref="content"/>
                <button type="submit" onClick={e => this.handleOnClick(e)}>Submit</button>
            </div>);
    }
}

AddComment.propTypes = {
    onAddComment: PropTypes.func.isRequired
};

export default AddComment;