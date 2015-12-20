var express = require('express');
var app = express(); // Instantiate an express object.
var middleware = require('./middleware');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

// Middleware
app.use(middleware.one);
app.use(middleware.two);
app.use(middleware.three);

// Routes
app.get('/', function (req, res) {
  res.end("Hello world!\n");
});

// Server
var server = app.listen(app.get('port'), app.get('host'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening on http://%s:%s', host, port);
  console.log('Ctrl + C to stop it.');
});
