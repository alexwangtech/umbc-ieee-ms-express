var express = require('express');
var router = express.Router();

/**
 * Error Router
 *
 * Default page for any errors
 */
router.get('/', function(req, res, next) {
  res.render('error');
});

module.exports = router;
