var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express(),
    port = process.env.PORT || 5000;

var nav = [
    {link: '/books', text: 'Book'},
    {link: '/authors', text: 'Author'}
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set('views','src/views');
app.set('view engine','ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

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