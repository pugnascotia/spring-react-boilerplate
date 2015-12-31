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

  handleOnSignIn() {
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
          debugger;
          this.props.dispatch(authenticated(success.data));

          const { location } = this.props;
          const nextPathName = location.state && location.state.nextPathname ? location.state.nextPathname : '/';

          this.context.history.replaceState(null, nextPathName);
        },
        failure => this.setState({authFailed: true})
      )
  }

  render() {
    let authFailedMessage = this.state.authFailed
      ? (<div class="row"><div className="col-xs-12">Authentication failed!</div></div>)
      : null;

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>Sign In</h1>
          </div>
        </div>
        {authFailedMessage}
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
            <button onClick={() => this.handleOnSignIn()} type="button" className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.contextTypes = { history: PropTypes.history };

function mapStateToProps(state) {
  return { auth: state.auth };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(SignIn);
