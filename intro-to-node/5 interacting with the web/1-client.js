var http = require('https');

console.log("Going to make request...");

// Version 1:  http.request with string URL

var req = http.request('https://www.google.co.uk/', function (response) {
    console.log(response.statusCode);
    response.pipe(process.stdout);
});
req.end();

var options = {
    host: 'www.google.co.uk',
    port: 443,
    path: '/',
    method: 'GET'
};

// Version 2:  http.request with options object

var req = http.request(options, function (response) {
    console.log(response.statusCode);
    response.pipe(process.stdout);
});

req.end();

// Version 3:  http.get()

http.get('https://www.google.co.uk/', function(response) {
    console.log(response.statusCode);
    response.pipe(process.stdout);
});

// Version 4:  pluralsight.com, notice does not follow redirects

http.get('https://www.pluralsight.com/', function(response) {
    console.log(response.statusCode);
    response.pipe(process.stdout);
});