var express = require('express');
const { render } = require('jade');
var router = express.Router();

/**
 * Admin Login Page
 *
 * Page for Administrator Login
 * 
 * If the userid session already exists, we will redirect to the 
 * admin page instead.
 */
router.get("/", function(req, res, next) {
  if (req.session.userid) {
    res.redirect('/admin-page');
  }
  else {
    let renderAlert = req.query.renderAlert === "true" ? true : false;
    res.render('admin-login', { renderAlert : renderAlert });
  }
});

module.exports = router;
