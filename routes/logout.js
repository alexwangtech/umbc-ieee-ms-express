var express = require('express');
var mariadb = require('mariadb');
var connInfo = require('../sql/conn-info.json');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('foo bar baz');
});

module.exports = router;
