import React, { Component } from 'react';
import './Connection.css';
import Axios from 'axios';

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

	deleteConnection = () => {
		Axios.delete('/api/connections/' + this.props.data.id).then(res => {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange(true);
			}
		});
	};

	render() {
		return (
			<li className="connection-item">
				<p>{this.props.data.to.dId}</p>
				<div onClick={this.deleteConnection} className="deleteItem">
					X
				</div>
			</li>
		);
	}
}

export default Connection;
