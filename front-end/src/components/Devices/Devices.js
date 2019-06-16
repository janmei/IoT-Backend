import React, { Component, Fragment } from 'react';
import './Devices.css';
import Axios from 'axios';
import qs from 'qs';
import Button from 'antd/lib/button';

const config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};
class Devices extends Component {
	constructor() {
		super();

		this.state = {
			devices: [],
			connections: [],
			addConnection: '',
			selectedDevice: ''
		};
	}

	componentDidMount() {
		Axios.get('/api/connections').then(res => {
			this.setState({
				connections: res.data
			});
		});
		Axios.get('/api/devices').then(res => {
			this.setState({
				devices: res.data
			});
		});
	}

	addConnection = e => {
		this.setState({
			addConnection: e.target.value,
			selectedDevice: this.state.devices[0].id
		});
		e.preventDefault();
	};

	renderDeviceList() {
		if (this.state.devices != null) {
			return this.state.devices.map((item, i) => {
				return <option value={item.id}>{item.dId}</option>;
			});
		} else {
			return;
		}
	}

	saveConnectionTo = (from, to, e) => {
		var data = qs.stringify(
			{
				from: from,
				to: to
			},
			{ allowDots: true }
		);
		var arrIndex;
		this.state.devices.some((el, i) => {
			if (el.id === from) {
				arrIndex = i;
				return true;
			}
		});

		Axios.post('/api/connections', data, config).then(res => {
			var data = qs.stringify({ connections: res.data.id });
			Axios.put('/api/devices/' + from + '/connections', data, config);
		});
		e.preventDefault();
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	renderConnections() {
		return this.state.connections.map(connection => {
			return (
				<div className="device-group" key={connection.id}>
					<div>
						<input value={connection.from.dId} key={connection.from.id} />
						<input value={connection.id} key={connection.id} />
						<input value={connection.to.dId} key={connection.to.id} />
					</div>
					{this.state.addConnection != connection.id ? (
						<Button
							value={connection.id}
							onClick={this.addConnection}
							key={connection.id}
						>
							Verbindung hinzufügen
						</Button>
					) : (
						<div>
							<select onChange={this.handleChange('selectedDevice')}>
								{this.renderDeviceList()}
							</select>

							<Button
								onClick={this.saveConnectionTo.bind(
									this,
									connection.from.id,
									this.state.selectedDevice
								)}
								key="save"
							>
								Sichern
							</Button>
						</div>
					)}
				</div>
			);
		});
	}

	render() {
		return <div className="Devices">{this.renderConnections()}</div>;
	}
}

export default Devices;
