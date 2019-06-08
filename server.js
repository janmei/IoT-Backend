var mqtt = require('mqtt');
var conn = require('./config.json');
var client = mqtt.connect(
	`mqtts://${conn.username}:${conn.pass}@m24.cloudmqtt.com:${conn.port}`
);
var express = require('express');
var app = express();

app.use('react', './front-edn/public/index.html');
// React Site
app.get('/admin', function(req, res) {
	res.send('Hello World!');
});

client.on('connect', function() {
	client.subscribe('presence', function(err) {
		if (err) throw err;
	});
});

client.on('message', function(topic, message) {
	// message is Buffer
	console.log(message.toString());
	client.end();
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
