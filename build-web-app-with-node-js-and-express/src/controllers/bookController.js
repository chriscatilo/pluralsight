var mongodb = require('mongodb'),
    mongodb = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId;

var bookController = function(bookService, nav) {

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };

    function middleware(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    }

    function getIndex(req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    }

    function getById(req, res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, results) {
                res.render('bookView', {
                    title: 'Books',
                    nav: nav,
                    book: results
                });
            });
        });
    }
};

module.exports = bookController;