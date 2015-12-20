var express = require('express');
var app = express(); // Instantiate an express object.
var middleware = require('./middleware');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

// Mounting the middleware
app.use('/', middleware.one, middleware.two);
app.use('/about', middleware.three);

// Routes
app.get('/', function (req, res) {
  res.end("Hello world!\n");
});

app.get('/about', function (req, res) {
  res.end('What do you wanna know cowboy?\n');
});

app.get('/about/me', function (req, res) {
  res.end("I'm very cool!\n");
});

// Server
var server = app.listen(app.get('port'), app.get('host'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening on http://%s:%s', host, port);
  console.log('Ctrl + C to stop it.');
});
