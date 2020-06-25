var express = require('express');
const { render } = require('jade');
var router = express.Router();

/**
 * Admin Login Page
 *
 * Page for Administrator Login
 */
router.get("/", function(req, res, next) {
  let renderAlert = req.query.renderAlert === "true" ? true : false;
  res.render('admin-login', { renderAlert : renderAlert });
});

module.exports = router;
