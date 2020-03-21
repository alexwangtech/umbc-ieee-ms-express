var express = require("express");
var router = express.Router();

/**
 * Admin Login Page
 *
 * Page for Administrator Login
 */
router.get("/", function(req, res, next) {
  res.render("admin-login");
});

module.exports = router;
