// @flow

export type Role =
    'ROLE_ADMIN'
  | 'ROLE_USER'
  | 'ROLE_ANONYMOUS';

export type AuthState = {
  signedIn: boolean,
  roles: Role[]
};

type AuthenticatedAction = {
  type: 'AUTHENTICATED',
  payload: Role[]
};

type LogoutAction = {
  type: 'LOGGED_OUT'
};

type Action = AuthenticatedAction | LogoutAction;

const defaultState = {
  signedIn: false,
  roles: []
};

export default function reducer(state : AuthState = defaultState, action : Action) : AuthState {
  switch (action.type) {
    case 'AUTHENTICATED':
      return {
        signedIn: true,
        roles: action.payload
      };

    case 'LOGGED_OUT':
      return {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      };

    default:
      return state;
  }
}

export function authenticated(authData : { roles: Role[] }) : AuthenticatedAction {
  return {
    type: 'AUTHENTICATED',
    payload: authData.roles
  };
}

export function logout() : LogoutAction {
  return {
    type: 'LOGGED_OUT'
  };
}
