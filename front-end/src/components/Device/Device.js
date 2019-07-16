import React, { Component } from 'react';
import './Device.css';
import Axios from 'axios';
import qs from 'qs';
import Button from 'antd/lib/button';
import Connection from '../Connection/Connection';

const config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};
class Device extends Component {
	constructor() {
		super();

		this.state = {
			id: null,
			connections: [],
			addConnection: '',
			device: {},
			selectedDevice: '',
			devices: []
		};
	}
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	componentDidMount() {
		this.setState({
			device: this.props.data,
			devices: this.props.devices,
			connections: this.props.data.connections
		});
	}

	componentWillReceiveProps(next) {
		this.setState({
			connections: next.data.connections
		});
	}

	addConnection = e => {
		this.setState({
			addConnection: e.target.value,
			selectedDevice: this.state.device.id
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
		this.state.devices.some((el, i) => {
			if (el.id === from) {
				return true;
			}
		});

		Axios.post('/api/connections', data, config).then(res => {
			var data = qs.stringify({ connections: res.data.id });
			Axios.put('/api/devices/' + from + '/connections', data, config).then(
				() => {
					if (typeof this.props.onChange === 'function') {
						this.props.onChange(true);
					}
				}
			);
		});
		e.preventDefault();
	};

	sendUpdate = () => {
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(true);
		}
	};

	renderConnections() {
		return (
			<div className="device-group" key={this.state.device.id}>
				{this.state.addConnection !== this.state.device.id ? (
					<Button
						value={this.state.device.id}
						onClick={this.addConnection}
						key={this.state.device.id}
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
								this.state.device.id,
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
	}

	render() {
		return (
			<div className="Device">
				<div className="number">{this.props.data.dId}</div>
				<ul className="connections">
					{this.state.connections.map(connection => {
						return (
							<Connection
								data={connection}
								key={connection.id}
								onChange={this.sendUpdate}
							/>
						);
					})}
				</ul>
				{this.renderConnections()}
			</div>
		);
	}
}

export default Device;
