import React from 'react';
import { connect } from 'react-redux';

class ServerError extends React.Component {
  render() {
    return (
      <div>
        <h1>Server Error</h1>
        <p>Something broke on the server. Sorry about that.</p>
      </div>
    );
  }
}

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Not Found</h1>
        <p>That resource doesn't exist. Sorry about that.</p>
      </div>
    );
  }
}

class Errors extends React.Component {

  render() {
    const status = this.props.errors.hasOwnProperty('status')
      ? parseInt(this.props.errors.status)
      : 404;

    switch (status) {
      case 500:
        return <ServerError />;

      default:
        return <NotFound />;
    }
  }
}

function mapStateToProps(state) {
  return { errors: state.errors };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(Errors);
