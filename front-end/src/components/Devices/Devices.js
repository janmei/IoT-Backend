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
				if (this.state.deviceConnections.find(x => x.id === el.id) != true) {
					var obj = {
						dId: el.from.dId,
						connections: ''
					};
					this.state.deviceConnections.push(el);
				}
			}
		});
	};

	addConnection = e => {
		this.setState({
			addConnection: e.target.value,
			selectedDevice: this.state.devices[0].id
		});
		e.preventDefault();
	};

	addNewConnection = e => {
		this.setState({
			addNewConnection: true,
			selectedDeviceInput: this.state.devices[0].id,
			selectedDeviceOutput: this.state.devices[0].id
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

	createConnection = () => {
		Axios.post('/api/connections', config).then(res => {
			this.updateConnections();
		});
	};

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
			Axios.put('/api/devices/' + from + '/connections', data, config).then(
				() => {
					this.updateConnections();
				}
			);
		});
		e.preventDefault();
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
				<div className="device-group" key={device.id}>
					<Fragment>
						{device.connections.map((el, i) => {
							return (
								<div>
									{i == 0 ? (
										<div>
											<input value={el.from.dId} key={el.from.id} />
											<input value={el.to.dId} key={el.to.id} />
										</div>
									) : (
										<div>
											<input value={el.to.dId} key={el.to.id} />
										</div>
									)}
								</div>
							);
						})}
					</Fragment>
					{this.state.addConnection != device.id ? (
						<Button
							value={device.id}
							onClick={this.addConnection}
							key={device.id}
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
									device.id,
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
		return (
			<div className="Devices">
				{this.renderConnections()}
				{this.renderAddConnection()}
			</div>
		);
	}
}

export default Devices;
