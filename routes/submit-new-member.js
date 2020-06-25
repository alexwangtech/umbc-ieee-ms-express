var express = require('express');
var router = express.Router();
var mariadb = require('mariadb');
var connInfo = require('../sql/conn-info.json');

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

  // Make all fields lowercase
  firstname = firstname.toLowerCase();
  lastname = lastname.toLowerCase();
  email = email.toLowerCase();
  
  // Make a connection to MariaDB:
  mariadb.createConnection(connInfo)
    .then(conn => {
      conn.query(getSelectAllQuery())
        .then(data => {
          // Searching for duplicates -> if found, render the new member page again, but this time with error alert
          data.forEach(item => {
            if (firstname === item["FirstName"] && lastname === item["LastName"] 
                && email === item["Email"]) {
              res.redirect('new-member?renderAlert=true');
            }
          });
          
          // No duplicates found -> continue by feeding new info into the database
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
