var express = require('express');

var app = express();

var port = 5000;

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(port, function(err) {
   console.log('runnning server on port ' + 5000); 
});