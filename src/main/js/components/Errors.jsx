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
  errors: {
    // error: string,
    // exception: string,
    // message: string,
    // path: string,
    // timestamp: number,
    status: number
  }
};

const Errors = (props : Props) => {
  switch (props.errors.status) {
    case 500:
      return <ServerError />;

    case 404:
    default:
      return <NotFound />;
  }
};

/* Inject errors state and dispatch() into props */
export default connect(state => ({ errors: state.errors }))(Errors);
