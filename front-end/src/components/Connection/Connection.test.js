import React from 'react';
import ReactDOM from 'react-dom';
import Connection from './Connection';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Connection />, div);
	ReactDOM.unmountComponentAtNode(div);
});
