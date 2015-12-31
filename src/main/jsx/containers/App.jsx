import React from 'react';
import { IndexLink, Link, PropTypes } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import { loggedOut } from '../actions';

class App extends React.Component {

  handleSignOut() {
    axios.post('/signout')
      .then(
        success => {
          this.props.dispatch(loggedOut());
          this.context.history.replaceState(null, "/")
        },
        failure => console.error("Failed to log out successfully")
      );
  }

  render() {
    let authLink = this.props.auth.signedIn
      ? <a onClick={() => this.handleSignOut()}>Sign Out</a>
      : <Link to="/signin">Sign In</Link>;

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <IndexLink to="/" className="navbar-brand">spring-react-boilerplate</IndexLink>
            </div>
            <div id="navbar" className="collapse navbar-right navbar-collapse">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/">Home</IndexLink></li>
                <li><Link to="/add">Add Comment</Link></li>
                <li>{authLink}</li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.contextTypes = { history: PropTypes.history };

function mapStateToProps(state) {
  return { auth: state.auth };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(App);
