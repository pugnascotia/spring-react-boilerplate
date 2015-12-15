import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

import Hello from './components/Hello';

if (typeof window !== 'undefined') {
    var initialState = typeof __INITIAL_STATE__ === 'undefined' ? {} : __INITIAL_STATE__;
    render(<Hello {...initialState} />, document.getElementById('app'));
}

export function renderApp(data) {
    return renderToString(<Hello {...data} />);
}