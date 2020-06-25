var express = require('express');
var router = express.Router();
var mariadb = require('mariadb');
var connInfo = require('../sql/conn-info.json');

// Function creates the query needed to search for the user
var getSearchUserQuery = (username, password) => {
  return (
    `SELECT ID FROM Users WHERE Username='${username}' AND Password='${password}';`
  );
}

/**
 * Admin Logging In
 *
 * Router for when admin submits the login information.
 */
router.post('/', function(req, res, next) {

  // Username should not be case-sensitive, but password is case-sensitive
  const username = (req.body.username).toLowerCase();
  const password = req.body.password;

  // Make a connection to MariaDB
  mariadb.createConnection(connInfo)
    .then(conn => {
      // Attempt to search for an ID that matches the username and password given in form
      conn.query(getSearchUserQuery(username, password)) // find id that matches user
        .then(result => {
          // If we get a result back
          if (result.length == 1) { // meta does not count as part of the lenght, so we just need length to be 1

            // set req.session.userid -> user id (the result)
            req.session.userid = result[0].ID;

            // render the success page
            res.render('thankyou');
          } 
          // If we do not get a result back
          else {
            // render the page again, invalid value (???)
            res.redirect('admin-login?renderAlert=true');
          }
        })
        .catch(err => {
          // foo
        });
    })
    .catch(err => {
      // foo
    });
});

module.exports = router;
