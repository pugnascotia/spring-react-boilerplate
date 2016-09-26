import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ServerError = () => (
  <div>
    <h1>Server Error</h1>
    <p>Something broke on the server. Sorry about that.</p>
  </div>
);

const NotFound = () => (
  <div>
    <h1>Not Found</h1>
    <p>That resource doesn't exist. Sorry about that.</p>
  </div>
);

const Errors = props => {
  const status = props.errors.hasOwnProperty('status')
    ? Number.parseInt(props.errors.status, 10)
    : 404;

  switch (status) {
    case 500:
      return <ServerError />;

    default:
      return <NotFound />;
  }
};

Errors.propTypes = {
  errors: PropTypes.shape({
    status: PropTypes.number
  })
};

/* Inject errors state and dispatch() into props */
export default connect(state => ({ errors: state.errors }))(Errors);
