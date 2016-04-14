import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'react-router';

import axios from 'axios';

import { authenticated } from '../actions';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {authFailed: false};
  }

  handleOnSignIn(event) {
    event.preventDefault();

    let username = this.refs.username.value.trim();
    let password = this.refs.password.value.trim();

    if (username.length === 0) {
      return;
    }

    let data = 'username=' + encodeURIComponent(username)
      + '&password=' + encodeURIComponent(password);

    axios.post('/api/authenticate', data)
      .then(
        success => {
          this.props.dispatch(authenticated(success.data));

          const { location } = this.props;
          const nextPathname = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

          this.context.router.replace(nextPathname);
        },
        failure => {
          console.error(failure);
          this.setState({authFailed: true});
        }
      );
  }

  authFailedMessage() {
    return this.state.authFailed
      ? (<div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 alert alert-danger" role="alert">Authentication failed!</div>
        </div>)
      : null;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleOnSignIn(e)}>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>Sign In</h1>
          </div>
        </div>
        {this.authFailedMessage()}
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label>Username</label>
            <input className="form-control" ref="username" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label>Password</label>
            <input className="form-control" ref="password" type="password" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
}

SignIn.contextTypes = { router: PropTypes.router.isRequired };

function mapStateToProps(state) {
  return { auth: state.auth };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(SignIn);
