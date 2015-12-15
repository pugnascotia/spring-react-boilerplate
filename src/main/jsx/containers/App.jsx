import React from 'react';
import { connect } from 'react-redux'

import { addMessage } from '../actions';
import AddComment from '../components/AddComment';
import HelloList from '../components/HelloList';

class App extends React.Component {

    render() {
        const { dispatch, messages } = this.props;
        return (
            <div>
                <AddComment onAddComment={(author,content) => dispatch(addMessage(author,content))} />
                <HelloList messages={messages} />
            </div>
        );
    }
}

/* Inject the entire state and dispatch() into props */
export default connect(state => state)(App);