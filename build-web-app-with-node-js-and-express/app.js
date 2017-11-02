var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views','src/views');
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [
            {link: '/books', text: 'Books'},
            {link: '/authors', text: 'Authors'}
        ]});
});

app.listen(port, function(err) {
    console.log('runnning server on port ' + port);
});