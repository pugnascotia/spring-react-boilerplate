import React from 'react';
import { render } from 'react-dom';

import Hello from './components/Hello';

if (typeof window !== 'undefined') {
    render(<Hello/>, document.getElementById('app'));
}