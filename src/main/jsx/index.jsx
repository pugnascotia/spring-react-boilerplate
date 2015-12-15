import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

import Hello from './components/Hello';

if (typeof window !== 'undefined') {
    render(<Hello/>, document.getElementById('app'));
}

export function renderApp() {
    return renderToString(<Hello/>);
}