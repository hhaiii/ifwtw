var sys = require('sys');
var xmpp = require('node-xmpp');
var http = require('http');
//var argv = process.argv;
var express = require("express");

// Webapp

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

cl.on('online',function() {
	cl.send(new xmpp.Element('presence', {}).
	c('show').t('chat').up().
	c('status').t('Happily echoing your <message/> stanzas'));
});

cl.on('stanza',function(stanza) {
	if (stanza.is('message') &&
	// Important: never reply to errors!
	stanza.attrs.type !== 'error') {

	var body = stanza.getChild('body');
	if (body) {
		var message = body.getText();
		http.get("http://api.electricimp.com/v1/679dcd70d05fc6f8/30ab3df52bbacf21?value=" + message, function(res) {
			console.log(message);
			console.log("Got response: " + res.statusCode);

		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	}
	// Swap addresses...
		
		 stanza.attrs.to = stanza.attrs.from;
		 delete stanza.attrs.from;
		 //and send back.
	if (body) 
		 console.log("message! " + message);
		 //cl.send(stanza);



	}
});

cl.on('error',

function(e) {
	sys.puts(e);
});

function test()
{
   console.trace();
   setTimeout(test, 10000);
}

test();

