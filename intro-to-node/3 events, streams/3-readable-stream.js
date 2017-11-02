var request = require('request'); // make sure to install 'request'

var s = request('http://www.pluralsight.com/');

s.on('data', function(chunk) {
    console.log(">>>Data>>> " + chunk);
});

s.on('end', function() {
    console.log(">>>Done!>>>");
});