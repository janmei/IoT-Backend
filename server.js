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
	client.subscribe('#', function(err) {
		if (err) throw err;
	});
});

client.on('message', function(topic, message) {
	// message is Buffer
	var parsed = JSON.parse(message);
	console.log(topic);

	if (topic.includes('d/s/')) {
		triggerConnections(parsed);
	}

	// send socket message to frontend
	// sendSocket()

	// SEND TO DB
	// queryAndStore(parsed);
});

triggerConnections = json => {
	axios
		.get(DB_URL + '/api/devices/did/' + json.id)
		.then(res => {
			var body = res.data;

			var connections = body.connections;

			var payload = { type: 'action' };

			for (var connect of connections) {
				client.publish('s/d/' + connect.to.dId, JSON.stringify(payload));
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
