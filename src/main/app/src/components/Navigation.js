/* @flow */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { loggedOut } from '../actions';

import type { Auth } from '../types';

type Props = {
  auth: Auth,
  onSignOut: Function,
  history: {
    push: (path: string) => void
  }
};

class Navigation extends React.Component<Props> {
  handleSignOut() {
    axios.post('/api/signout')
      .then(
        (/* success*/) => {
          this.props.onSignOut();
          this.props.history.push('/');
        },
        failure => console.error(`Failed to log out successfully: ${failure}`)
      );
  }

  adminMenu() {
    return this.props.auth.roles.some(r => r === 'ROLE_ADMIN')
      ? (<li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Admin <span className="caret" /></a>
        <ul className="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider" />
          <li><a href="#">Separated link</a></li>
        </ul>
      </li>)
      : null;
  }

  authLink() {
    if (!this.props.auth.signedIn) {
      return <Link to="/signin">Sign In</Link>;
    }

    return (
      <div className="navbar-form" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <button className="btn btn-link" onClick={() => this.handleSignOut()}>Sign Out</button>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">spring-react-boilerplate</Link>
          </div>
          <div id="navbar" className="collapse navbar-right navbar-collapse">
            <ul className="nav navbar-nav">
              {this.adminMenu()}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add">Add Comment</Link></li>
              <li>{this.authLink()}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

/* Inject auth state and a dispatch() wrapper into props */
export default withRouter(
  connect(
    state => ({ auth: state.auth }),
    dispatch => ({ onSignOut: () => dispatch(loggedOut()) })
  )(Navigation)
);
