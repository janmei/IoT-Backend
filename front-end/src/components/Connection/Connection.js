import React, { Component } from 'react';
import './Connection.css';

const config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};
class Connection extends Component {
	constructor() {
		super();

		this.state = {
			id: null,
			connections: []
		};
	}

	render() {
		return (
			<li>
				<p>{this.props.data.to.dId}</p>
			</li>
		);
	}
}

export default Connection;
