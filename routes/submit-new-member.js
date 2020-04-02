var express = require("express");
var router = express.Router();

var mariadb = require("mariadb");
var connInfo = require("../sql/conn-info.json");


// Query string for retrieving all from MariaDB:
var getSelectAllQuery = () => {
  return (
    "SELECT * FROM Members;"
  );
}

// Query string for inserting new member into table
var getNewMemberQuery = (first, last, email) => {
  return (
    "INSERT INTO Members (LastName, FirstName, Email) values ("
    + "\"" + first + "\"" + ", "
    + "\"" + last + "\"" + ", "
    + "\"" + email + "\""
    + ");"
  );
}

/**
 * Submit NEW Member Info
 *
 * Router for when a new member submits attendance
 */
router.post("/", function(req, res, next) {
  // Get the request data:
  let { firstname, lastname, email } = req.body
  
  // Make a connection to MariaDB:
  mariadb.createConnection(connInfo)
    .then(conn => {
      conn.query(getSelectAllQuery())
        .then(data => {
          data.forEach(item => {
            if (firstname === item["FirstName"] && lastname === item["LastName"] 
                && email === item["Email"]) {
              res.redirect('new-member?renderAlert=true');
            }
          });
          
          conn.query(getNewMemberQuery(firstname, lastname, email))
            .then(success => {
              res.redirect('/new-member-success');
            })
            .catch(err => {
              res.redirect('/error');
            });
        })
        .catch(err => {
          res.redirect('/error');
        });
    })
    .catch(err => {
      res.redirect('/error');
    });
});

module.exports = router;
