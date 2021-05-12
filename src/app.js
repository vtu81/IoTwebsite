const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var mqtt = require('mqtt')
var opt = {
  port: 1883,
  clientId: 'nodejs'
}
var client = mqtt.connect('mqtt://localhost', opt)

client.on('connect', function() {
  console.log('Successfully connected to MQTT server :)')
  client.subscribe('testapp')
})

client.on('message', function(topic, msg) {
  var obj={};
  obj=JSON.parse(msg);	
  console.log(obj)
  // console.log('Received topic \'' + topic + '\' message:\'' + msg.toString() + '\'')
})