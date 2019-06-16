var mqtt = require('mqtt');
var conn = require('./config.json');
var client = mqtt.connect(
	`mqtts://${conn.username}:${conn.pass}@m24.cloudmqtt.com:${conn.port}`
);

client.on('connect', function() {
	client.subscribe('s/d/0', function(err) {
		if (!err) {
		}
	});
});
var payload = {
	id: 1,
	action: {
		name: 'ping',
		state: 1
	}
};

// setInterval(() => {
// 	client.publish('d/s/0', JSON.stringify(payload));
// }, 5000);

client.on('message', function(topic, message) {
	// message is Buffer
	if (topic.includes('s/d/')) {
		console.log(JSON.parse(message));
	}
	// client.end()
});
