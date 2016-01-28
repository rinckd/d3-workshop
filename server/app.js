var express = require('express');
var app = express();

var port = 8080;

app.use(express.static('wwwroot'));

app.get('/', function(req, res) {
  
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
