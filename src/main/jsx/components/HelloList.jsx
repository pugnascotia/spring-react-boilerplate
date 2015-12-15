import React, { PropTypes } from 'react';
import Hello from './Hello';

class HelloList extends React.Component {
    render() {
        return (
            <div className="messages">
                <h1>Messages</h1>
                { this.props.messages.map(m => <Hello {...m} key={m.id} />) }
            </div>
        );
    }
}

HelloList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        author: PropTypes.string
    }).isRequired).isRequired
};

export default HelloList;