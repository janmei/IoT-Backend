import React, { Component, Fragment } from 'react';
import './Devices.css';
import Axios from 'axios';

class Devices extends Component {
	constructor() {
		super();

		this.state = {
			devices: [],
			connections: []
		};
	}

	componentDidMount() {
		Axios.get('/api/connections').then(res => {
			this.setState({
				connections: res.data
			});
		});
	}

	renderConnections(connections) {
		return connections.map(connection => {
			console.log(connection);

			return (
				<Fragment>
					<input value={connection.id} key={connection.id} />
					<input value={connection.to.dId} key={connection.to} />
				</Fragment>
			);
		});
	}

	renderDevices() {
		return this.state.connections.map(connection => {
			return (
				<div className="device-group">
					<input value={connection.from.dId} key={connection.from.id} />
					<input value={connection.id} key={connection.id} />
					<input value={connection.to.dId} key={connection.to.id} />
				</div>
			);
		});
	}

	render() {
		return <div className="Devices">{this.renderDevices()}</div>;
	}
}

export default Devices;
