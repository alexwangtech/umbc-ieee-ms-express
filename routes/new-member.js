var express = require("express");
var router = express.Router();

/**
 * New Member
 * 
 * Page for a new member to submit attendance
 */
router.get("/", function(req, res, next) {
  let renderAlert = req.query.renderAlert === "true" ? true : false;
  res.render("new-member", { renderAlert: renderAlert });
});

module.exports = router;
