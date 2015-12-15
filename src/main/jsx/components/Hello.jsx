import React, { PropTypes } from 'react';

class Hello extends React.Component {

    render() {
        return (
            <div className="message">
                <h3>{this.props.content}</h3>
                <p>{this.props.author}</p>
            </div>
        );
    }
}

Hello.propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default Hello;