var express = require('express')
var router = express.Router();

/**
 * New member success page
 */
router.get('/', function(req, res, next) {
  res.render('new-member-success'); 
});

module.exports = router;
