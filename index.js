var express = require('express');
var app = express(); // Instantiate an express object.

// Settings
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

// Middleware
function middlewareOne(){
  function one(req, res, next) {
    res.write("#1: I'm middleware number one.\n");
    next();
  }
  return one;
}

// Routes
app.get('/', middlewareOne(), function (req, res) {
  res.end("Hello world!\n");
});

// Server
var server = app.listen(app.get('port'), app.get('host'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening on http://%s:%s', host, port);
  console.log('Ctrl + C to stop it.');
});
