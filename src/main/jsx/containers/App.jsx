import React from 'react';

class App extends React.Component {

    render() {
        return (
            <div id="app">
                {this.props.children}
            </div>
        );
    }
}

export default App;