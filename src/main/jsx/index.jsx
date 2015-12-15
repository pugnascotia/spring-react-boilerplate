import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

import HelloList from './components/HelloList';

if (typeof window !== 'undefined') {
    let state = typeof __INITIAL_STATE__ === 'undefined' ? {} : __INITIAL_STATE__;
    render(<HelloList {...state} />, document.getElementById('app'));
}

export function renderApp(state) {
    return renderToString(<HelloList {...state} />);
}