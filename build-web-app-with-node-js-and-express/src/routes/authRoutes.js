var express = require('express');

var router = function(nav) {
    var authRouter = express.Router(),
        mongodb = require('mongodb').MongoClient;

    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
        });
    return authRouter;
};

module.exports = router;