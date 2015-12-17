var express = require('express');
var app = express(); // Instantiate an express object.

// Settings
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

// Routes
app.get('/', function (req, res) {
  res.send("Hello world!\n");
});

// Server
var server = app.listen(app.get('port'), app.get('host'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening on http://%s:%s', host, port);
  console.log('Ctrl + C to stop it.');
});
