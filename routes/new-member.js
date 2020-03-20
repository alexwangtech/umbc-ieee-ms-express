var express = require("express");
var router = express.Router();

/**
 * New Member
 * 
 * Page for a new member to submit attendance
 */
router.get("/", function(req, res, next) {
  res.render("new-member");
});

module.exports = router;
