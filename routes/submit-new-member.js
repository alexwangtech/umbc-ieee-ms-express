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
    // TODO: create the query string
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
  // DEBUG
  console.log(req.body);


  // Get the request data:
  let { firstname, lastname, email } = req.body
  
  // Make a connection to MariaDB:
  mariadb.createConnection(connInfo)
    .then(conn => {
      conn.query(getSelectAllQuery())
        .then(data => {
          data.forEach(item => {
            // DEBUG
            console.log('firstname: ' + firstname);
            console.log('lastname: ' + lastname);
            console.log('email: ' + email);
            console.log('sql firstname: ' + item["FirstName"]);
            console.log('sql lastname: ' + item["LastName"]);
            console.log('sql email: ' + item["Email"]);
          
            if (firstname === item["FirstName"] && lastname === item["LastName"] 
                && email === item["Email"]) {
              // TODO: add proper comment for context
              res.redirect('new-member?renderAlert=true');
            }
          });
          
          // TODO: create the new member
          console.log('new member created!');
          conn.query(getNewMemberQuery(firstname, lastname, email))
            .then(success => {
              console.log("success!");
            })
            .catch(err => {
              // DEBUG
              console.log(err);
              
              res.redirect('/error');
            });
        })
        .catch(err => {
          // DEBUG
          console.log(err);
          
          res.redirect('/error');
        });
    })
    .catch(err => {
      // DEBUG
      console.log(err);
      
      res.redirect('/error');
    });
  // TODO: follow up actions here
});

module.exports = router;
