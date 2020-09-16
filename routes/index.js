var express = require('express');
var router = express.Router();

/**
 * Home Page
 *
 * Member Submit Attendance Page
 */
router.get('/', function(req, res, next) {
  let renderAlert = req.query.renderAlert === "true" ? true : false;
  res.render('index', { renderAlert : renderAlert });
});

module.exports = router;
