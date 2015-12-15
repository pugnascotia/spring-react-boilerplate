import React from 'react';
import { connect } from 'react-redux'

import HelloList from '../components/HelloList';

class App extends React.Component {

    render() {
        return <HelloList {...this.props} />;
    }
}

/* Inject the entire state and dispatch() into props */
export default connect(state => state)(App);