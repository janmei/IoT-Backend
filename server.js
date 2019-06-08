var mqtt = require('mqtt');
var conn = require('./config.json');
var client = mqtt.connect(
	`mqtts://${conn.username}:${conn.pass}@m24.cloudmqtt.com:${conn.port}`
);

var axios = require('axios');
var qs = require('qs');

const DB_URL = 'http://localhost:9000';
const config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

client.on('connect', function() {
	client.subscribe('/', function(err) {
		if (err) throw err;
	});
});

client.on('message', function(topic, message) {
	// message is Buffer
	var parsed = JSON.parse(message);
	console.log(parsed);

	// send socket message to frontend
	// sendSocket()

	// SEND TO DB
	// queryAndStore(parsed);
});

triggerConnections = json => {
	axios
		.get(DB_URL + '/devices/' + json.id, data, config)
		.then(res => {
			var body = res.body;

			var connections = body.connections;

			for (var connect of connections) {
				client.publish('/d/' + connect.to, connect.payload);
			}
		})
		.catch(err => {
			if (err) throw err;
		});
};

signUpDevice = json => {
	var data = qs.stringify(
		{
			dId: json.id,
			action: json.action
		},
		{ allowDots: true }
	);

	axios
		.put(DB_URL + '/devices/' + json.id, data, config)
		// .then(res => console.log(res))
		.catch(err => {
			if (err) throw err;
		});
};
