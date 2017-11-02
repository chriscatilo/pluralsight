var exec = require('child_process').exec;

var child = exec('dir', function(err, stdout, stderr) {
    if (err) {
        console.log('Error: ' + stderr);
    } else {
        console.log('Output is: ' + stdout);
    }
});

console.log("PID is " + child.pid);