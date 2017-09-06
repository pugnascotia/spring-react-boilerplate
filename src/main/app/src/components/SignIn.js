/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

import { authenticated } from '../data/modules/auth';
import type { Role } from '../data/modules/auth';

type Props = {
  authenticated: (authData: { roles: Role[] }) => void,
  location: {
    state?: {
      nextPathname?: string
    }
  },
  history: {
    push: (path: string) => void
  }
};

type State = {
  authFailed: boolean
};

class SignIn extends React.Component<Props, State> {
  state = {
    authFailed: false
  }

  usernameInput: ?HTMLInputElement;
  passwordInput: ?HTMLInputElement;

  handleOnSignIn(event) {
    event.preventDefault();

    const username = this.usernameInput ? this.usernameInput.value.trim() : '';
    const password = this.passwordInput ? this.passwordInput.value.trim() : '';

    if (username.length === 0) {
      return;
    }

    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    // TODO: It isn't great that this is embedded here. It means this
    // component's concerns are too mixed.
    axios.post('/api/authenticate', data)
      .then(
        (success: { data: { roles: Role[] }}) => {
          this.props.authenticated(success.data);

          const { location } = this.props;
          const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

          this.props.history.push(nextPathname);
        },
        failure => {
          console.error(failure);
          this.setState({ authFailed: true });
        }
      );
  }

  authFailedMessage() {
    if (!this.state.authFailed) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3 alert alert-danger" role="alert">
          Authentication failed!
        </div>
      </div>);
  }

  render() {
    return (
      <form onSubmit={e => this.handleOnSignIn(e)}>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>Sign In</h1>
          </div>
        </div>
        {this.authFailedMessage()}
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label htmlFor="userInput">Username</label>
            <input id="userInput" className="form-control" ref={el => { this.usernameInput = el; }} />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label htmlFor="passInput">Password</label>
            <input id="passInput" className="form-control" ref={el => { this.passwordInput = el; }} type="password" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
}

/* Inject auth state and dispatch() into props */
export default withRouter(
  connect(null, { authenticated })(SignIn)
);
