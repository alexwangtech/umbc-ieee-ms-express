var express = require("express");
var router = express.Router();

var mariadb = require("mariadb");
var logins = require("../logins/logins");
var connInfo = require("../sql/conn-info.json");

/**
 * Admin Logging In
 *
 * Router for when admin submits the login information.
 */
router.post("/", function(req, res, next) {
  console.log("post request for submit admin login information received!");
  
  // add business logic for authorization here
  const username = req.body.username;
  const password = req.body.password;
  let verified = false;
  for (let i = 0; i < logins.length; i++) {
    let currObj = logins[i];
    if (currObj.username === username && currObj.password === password) {
      verified = true; break;
    }
  }
  if (verified) {
    mariadb.createConnection(connInfo)
      .then(conn => {
        conn.query("select * from members;")
          .then(rows => {
            console.log("Data retrieved:\n");
            console.log(rows.slice(0, rows.length));
            conn.end();
            res.render("adminpage", { data: rows.slice(0, rows.length) });
          })
          .catch(err => {
            console.log("Query error!");
            res.render("error");
          });
      })
      .catch(err => {
        console.log("Connection error!");
        res.render("error");
      });
  } else {
    res.render("invalidcredentials");
  }
  
  // debug
  console.log("verified value: " + verified);
  console.log("end of the admin login submit router");
});

module.exports = router;
