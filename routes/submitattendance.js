var express = require("express");
var router = express.Router();

var mariadb = require("mariadb");
var connInfo = require("../sql/conn_info");

/**
 * Submit Member Info
 *
 * Router for when user submits member attendance
 */
router.post("/", function(req, res, next) {
  // get the firstname, lastname, and email from request
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;

  let getQueryString = () => {
    return (
      "insert into members values(" +
      "\"" + firstname + "\", " + 
      "\"" + lastname + "\", " + 
      "\"" + email + "\");"
    );
  }
  console.log(getQueryString());
  
  // make a connection to mariadb
  mariadb.createConnection(connInfo)
    .then(conn => {
      conn.query(getQueryString())
        .then(res => {
          console.log(res);
          conn.end();
        })
        .catch(err => {
          console.log("query error:");
          console.log(err);
        });
    })
    .catch(err => {
      console.log("connection error:");
      console.log(err);
    });
  

  // redirect to thank you page
  console.log("this is before the redirect");
  res.render("thankyou");
  console.log("this is after the redirect");
});

module.exports = router;
