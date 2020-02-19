var express = require("express");
var router = express.Router();

var mariadb = require("mariadb");
var connInfo = require("../sql/conn_info");

/**
 * Submit NEW Member Info
 *
 * Router for when a new member submits attendance
 */
router.post("/", function(req, res, next) {
  // get the firstname, lastname, and email from request
  let { firstname, lastname, email } = req.body;

  // if one of the fields is blank, render the error page
  if (firstname === "" ||
      lastname  === "" ||
      email     === "") {
    res.render();
    return;
  }

  let queryString = () => {
    return (

    );
  }
});

module.exports = router;
