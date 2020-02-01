var express = require('express');
var router = express.Router();

/**
 * Home Page
 *
 * Member Submit Attendance Page
 */
router.get('/', function(req, res, next) {
  console.log('before redirect');
  res.render('index', { title: 'Submit Attendance' });
  console.log("after redirtect");
});

module.exports = router;
