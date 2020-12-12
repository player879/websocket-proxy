var WebSocket = require('ws');
var fetch = require('node-fetch');
var {parse:parseQueryString} = require('query-string');
var wss = new WebSocket.Server({
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
});
var conncount = 0;
wss.on('connection', function (cws, req){
	var number = conncount++;
	console.log(`New connection #${number} from ${req.connection.remoteAddress} with ${req.url}`);
	cws.on('close', function(){
		console.log(`Closing connection #${number} from ${req.connection.remoteAddress}`);
	});
	try {
		fetch('https://www.multiplayerpiano.com').then(() => {
			var tws = new WebSocket('wss://multiplayerpiano.com', {origin:'https://www.multiplayerpiano.com'});
		}, () => {throw(new Error('Failed fetch'))});
	} catch(e) {
		console.error(e);
		cws.close();
		return;
	}
	
	// client to target
	var messageBuffer = [];
	tws.on('open', function(){
		for (let message of messageBuffer) tws.send(message);
		messageBuffer = undefined;
	});
	cws.on('message', function(message){
		if (tws.readyState == WebSocket.OPEN) tws.send(message);
		else if (messageBuffer) messageBuffer.push(message);
	});
	cws.on('close', function(){
		tws.close();
		messageBuffer = undefined;
	});
	cws.on('error', console.error);

	// target to client
	tws.on('message', function(message){
		if (cws.readyState == WebSocket.OPEN) cws.send(message);
	});
	tws.on('close', function(){
		cws.close();
	});
	tws.on('error', console.error);
});
