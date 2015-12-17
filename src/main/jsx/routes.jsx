import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import { AddComment, CommentList, SignIn } from './components';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={CommentList} />
        <Route path="add" component={AddComment}/>
        <Route path="signin" component={SignIn}/>
    </Route>
);

export default routes;
