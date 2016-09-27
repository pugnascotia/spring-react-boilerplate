/* @flow */
import React from 'react';
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

type Props = {
  errors: { status: string }
};

const Errors = (props : Props) => {
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

function mapStateToProps(state) {
  return { errors: state.errors };
}

/* Inject all state and dispatch() into props */
export default connect(mapStateToProps)(Errors);
