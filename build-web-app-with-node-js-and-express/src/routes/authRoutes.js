var express = require('express'),
    passport = require('passport');

var router = function(nav) {
    var authRouter = express.Router(),
        mongodb = require('mongodb').MongoClient;

    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                collection.insert(user, function(err, results) {
                    console.log(results);
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;