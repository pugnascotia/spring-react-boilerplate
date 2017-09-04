/* @flow */
import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

type Props = {
  component: React.ComponentType<any>,
  signedIn: bool
}

const PrivateRoute = ({ component: Component, signedIn, ...rest }: Props) => {
  const onComponentRender = props => (
    signedIn
      ? <Component {...props} />
      : (<Redirect
        to={{
          pathname: '/signin',
          // eslint-disable-next-line react/prop-types
          state: { from: props.location }
        }}
      />)
  );

  return <Route {...rest} render={onComponentRender} />;
};

function mapStateToProps(state) {
  return { signedIn: state.auth.signedIn };
}

/* Inject auth state and dispatch() into props */
export default connect(mapStateToProps)(PrivateRoute);
