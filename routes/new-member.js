var express = require("express");
var router = express.Router();

/**
 * New Member
 * 
 * Page for a new member to submit attendance
 */
router.get("/", function(req, res, next) {
  console.log("redirecting to new member attendance form page...");
  res.render("new-member");
  console.log("attendance form page successful!");
});

module.exports = router;
