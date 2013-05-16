/**
 * Echo Bot - the XMPP Hello World
 **/
var sys = require('sys');
var xmpp = require('node-xmpp');
var argv = process.argv;

var config = require('./config');

var cl = new xmpp.Client({ jid: config.username,
			   password: config.password });
cl.on('online',
      function() {
	  cl.send(new xmpp.Element('presence', { }).
		  c('show').t('chat').up().
		  c('status').t('Happily echoing your <message/> stanzas')
		 );
      });
cl.on('stanza',
      function(stanza) {
	  if (stanza.is('message') &&
	      // Important: never reply to errors!
	      stanza.attrs.type !== 'error') {

	      // Swap addresses...
	      stanza.attrs.to = stanza.attrs.from;
	      delete stanza.attrs.from;
	      // and send back.
	      cl.send(stanza);
	  }
      });
cl.on('error',
      function(e) {
	  sys.puts(e);
      });
