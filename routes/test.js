var express = require('express');
var router = express.Router();
var mariadb = require('mariadb');
var connInfo = require('../sql/conn-info.json');

/**
 * Testing connection to mariadb - logged out in console
 */
router.get('/', function(req, res, next) {
    // attempt to get connection to mariadb
    mariadb.createConnection(connInfo)
        .then(conn => {
            res.render('thankyou');
            console.log('mariadb connection success!');
        })
        .catch(err => {
            res.render('error');
            console.log('mariadb connection error:');
            console.log(err);
        });
});

module.exports = router;