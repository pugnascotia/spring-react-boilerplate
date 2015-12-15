import React from 'react';
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

export default HelloList;