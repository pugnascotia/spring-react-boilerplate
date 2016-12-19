/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { routerContext as RouterType } from 'react-router/PropTypes';

import axios from 'axios';

import { authenticated } from '../actions';

import type { Router } from '../types';

type State = {
  authFailed: boolean
};

class SignIn extends React.Component {
  context: { router: Router };
  props: { dispatch: Function, location: Object };
  state: State;

  usernameInput : HTMLInputElement;
  passwordInput: HTMLInputElement;

  constructor(props) {
    super(props);
    this.state = { authFailed: false };
  }

  handleOnSignIn(event) {
    event.preventDefault();

    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (username.length === 0) {
      return;
    }

    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    axios.post('/api/authenticate', data)
      .then(
        success => {
          this.props.dispatch(authenticated(success.data));

          const { location } = this.props;
          const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

          this.context.router.transitionTo(nextPathname);
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

SignIn.contextTypes = {
  router: RouterType.isRequired
};

/* Inject auth state and dispatch() into props */
export default connect(state => ({ auth: state.auth }))(SignIn);
