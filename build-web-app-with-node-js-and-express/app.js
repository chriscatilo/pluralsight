var express = require('express'),
    app = express(),
    sql = require('mssql');


/* mssql checklist
1. Enable TCP/IP protocol from Computer Management/Services and Application/SQL Server Configuration
2. Ensure that TCP Port for IPAll is set to 1433
3. Windows Firewall (wf.msc) allows traffic in port 1433
*/
var sqlConfig = {
    user: 'books',
    password: 'p@ssw0rd1',
    server: 'localhost',
    port: 1433,
    //debug: true,
    database: 'kodigouk.pluralsight.build-web-app.books'
};

sql.connect(sqlConfig, function(err) {
    console.log(err);
});

var nav = [
    {link: '/books', text: 'Book'},
    {link: '/authors', text: 'Author'}
];
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views','src/views');
app.set('view engine','ejs');

app.use('/books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [
            {link: '/books', text: 'Books'},
            {link: '/authors', text: 'Authors'}
        ]});
});

var port = process.env.PORT || 5000;
app.listen(port, function(err) {
    console.log('runnning server on port ' + port);
});