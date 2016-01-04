function auth(store) {

  return {
    signedIn: () => store.getState().auth.signedIn === true
  };
}

export default auth;
