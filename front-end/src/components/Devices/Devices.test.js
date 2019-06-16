import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import Devices from './Devices';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Devices />, div);
	ReactDOM.unmountComponentAtNode(div);
});
