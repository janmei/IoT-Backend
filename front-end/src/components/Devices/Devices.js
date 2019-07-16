import React, { Component } from 'react';
import './Devices.css';
import Axios from 'axios';
import Button from 'antd/lib/button';
import Device from '../Device/Device';

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
			addNewConnection: false,
			selectedDevice: '',
			selectedDeviceInput: '',
			selectedDeviceOutput: '',
			deviceConnections: []
		};
	}

	componentDidMount() {
		Axios.get('/api/connections').then(res => {
			this.setState({
				connections: res.data
			});
			this.setupDeviceConnections(res.data);
		});
		Axios.get('/api/devices').then(res => {
			this.setState({
				devices: res.data
			});
		});
	}

	updateConnections = () => {
		Axios.get('/api/devices').then(res => {
			this.setState({
				devices: res.data
			});
		});
	};

	setupDeviceConnections = data => {
		data.forEach(el => {
			if (this.state.deviceConnections.length > 0) {
				if (this.state.deviceConnections.find(x => x.id === el.id) !== true) {
					this.state.deviceConnections.push(el);
				}
			}
		});
	};

	addNewConnection = e => {
		this.setState({
			addNewConnection: true,
			selectedDeviceInput: this.state.devices[0].id,
			selectedDeviceOutput: this.state.devices[0].id
		});
		e.preventDefault();
	};

	createConnection = () => {
		Axios.post('/api/connections', config).then(res => {
			this.updateConnections();
		});
	};

	deleteConnection = id => {};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	renderAddConnection() {
		return (
			<div className="device-group">
				{!this.state.addNewConnection ? (
					<Button onClick={this.addNewConnection}>Neue Verbindung</Button>
				) : (
					<div>
						<select onChange={this.handleChange('selectedDeviceInput')}>
							{this.renderDeviceList()}
						</select>
						<select onChange={this.handleChange('selectedDeviceOutput')}>
							{this.renderDeviceList()}
						</select>

						<Button
							onClick={this.saveConnectionTo.bind(
								this,
								this.state.selectedDeviceInput,
								this.state.selectedDeviceOutput
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
	renderConnections() {
		return this.state.devices.map(device => {
			return (
				<Device
					data={device}
					devices={this.state.devices}
					onChange={this.updateConnections}
					key={device.id}
				/>
			);
		});
	}

	render() {
		return <div className="Devices">{this.renderConnections()}</div>;
	}
}

export default Devices;
