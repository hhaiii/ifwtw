var sys = require('sys');
var xmpp = require('node-xmpp');
var http = require('http');
var express = require("express");

// Webapp
// I needed a simple web interface to be pinged by Electric Imp Http Request to keep the service alive when on Heroku

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
	response.send('Hello World!');
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});


if (process.env.ENV == 'PRODUCTION') {
	var username = process.env.USERNAME;
	var password = process.env.PASSWORD;

} else {
	var config = require('./config');
	var username = config.username;
	var password = config.password;
}

// Client XMPP

var cl = new xmpp.Client({
	jid: username,
	password: password
});

cl.on('online', function() {
	cl.send(new xmpp.Element('presence', {}).
	c('show').t('chat').up().
	c('status').t('Happily echoing your <message/> stanzas'));
});

cl.on('stanza', function(stanza) {
	if (stanza.is('message') &&
	// Important: never reply to errors!
	stanza.attrs.type !== 'error') {
		var body = stanza.getChild('body');
		if (body) {
			var message = body.getText();
			http.get("http://api.electricimp.com/v1/679dcd70d05fc6f8/306c243553ccdbad?value=" + message, function(res) {
				console.log(message);
				console.log("Got response: " + res.statusCode);
				cl.send(new xmpp.Element('message',
                            { to: stanza.attrs.from,
                              type: 'chat'}).
			           c('body').
			           t('ok'));

			}).on('error', function(e) {
				console.log("Got error: " + e.message);
			});
		}
		if (body) console.log("message! " + message);
	}
});

cl.on('error',

function(e) {
	sys.puts(e);
});

// I needed this to keep the XMPP connection alive

function keepAlive() {
	console.log('XMPP keepAlive');
	setTimeout(keepAlive, 60000);
	cl.send(new xmpp.Element('message',
                            { to: username,
                              type: 'chat'}).
           c('body').
           t('keepAlive'));

}

keepAlive();