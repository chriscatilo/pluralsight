var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

var nav = [
    {link: '/books', text: 'Book'},
    {link: '/authors', text: 'Author'}
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views','src/views');
app.set('view engine','ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

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