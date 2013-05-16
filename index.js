/**
 * Echo Bot - the XMPP Hello World
 **/
var sys = require('sys');
var xmpp = require('node-xmpp');
var argv = process.argv;
var username = "jekolino@gmail.com"
var password = "h501s.23"

var cl = new xmpp.Client({ jid: username,
			   password: password });
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
