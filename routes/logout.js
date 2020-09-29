var express = require('express');
var mariadb = require('mariadb');
var connInfo = require('../sql/conn-info.json');

var router = express.Router();

/**
 * Sets the session.userid value to "null" and redirects back to the admin login page
 */
router.get('/', function(req, res, next) {
  req.session.userid = null;
  res.redirect('/admin-login');
});

module.exports = router;
