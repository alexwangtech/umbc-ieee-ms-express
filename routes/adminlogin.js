var express = require("express");
var router = express.Router();

/**
 * Admin Login Page
 *
 * Page for Administrator Login
 */
router.get("/", function(req, res, next) {
  console.log("page --> /adminlogin received!");
  res.render("adminlogin");
  console.log("page --> /adminlogin rendered!");
});

module.exports = router;
