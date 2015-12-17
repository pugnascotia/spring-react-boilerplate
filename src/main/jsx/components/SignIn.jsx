import React from 'react';

class SignIn extends React.Component {

  render() {
    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3">
          <h1>Sign In</h1>
        </div>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label>Username</label>
            <input className="form-control" name="username" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <label>Password</label>
            <input className="form-control" name="password" type="password" />
          </div>
          <div className="col-sm-6 col-sm-offset-3 form-group">
            <button type="button" className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
