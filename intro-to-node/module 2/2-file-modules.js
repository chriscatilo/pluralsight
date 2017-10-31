// Load mathfun.js from same directory
var mathfun = require('./mathfun');

const processResults = (err, results, time) => {

    const showError = () => console.log("ERROR: " + err.message);

    const showResults = () => console.log("The results are: " + results + " (" + time + " ms)");

    err ? showError() : showResults();
};

const doEvenDoubler = (i) => {
    console.log("Calling 'evenDoubler' with paramter '" + i + "'");
    mathfun.evenDoubler(i, processResults);
}

for (var i = 0; i<10; i++) 
    doEvenDoubler(i);

console.log("-----");

console.log("The 'foo' variable from module 'mathfun' = " + mathfun.foo);

// Should return undefined, since maxTime is not exported
console.log("The 'maxtime' variable is not exported: " + mathfun.maxTime);