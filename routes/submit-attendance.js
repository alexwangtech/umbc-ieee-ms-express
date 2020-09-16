var express = require("express");
var router = express.Router();
var mariadb = require("mariadb");
var connInfo = require("../sql/conn-info.json");

/**
 * getSelectQuery() : function
 * 
 * Creates a SELECT query, so that MariaDB can search for a member that
 * matches the provided first name, last name, and email address.
 * 
 * @param {String} firstname : The first name
 * @param {String} lastname : The last name
 * @param {String} email : The email address
 * @returns {String} : The SELECT query
 */
function getSelectQuery(firstname, lastname, email) {
  return (
    `SELECT ID FROM Members
     WHERE FirstName='${firstname}' AND LastName='${lastname}' AND Email='${email}';`
  );
}

/**
 * Creates an INSERT query so in order to add a new entry into the
 * Attendance table in MariadDB.
 * 
 * @param {String} memberID : The memberID value
 * @returns {String} : The INSERT query
 */
function getInsertQuery(memberID) {

  const date = getFormattedDate();

  return (
    `INSERT INTO Attendance (MemberID, Date)
     VALUES ('${memberID}', '${date}');`
  );
}

/**
 * getFormattedDate() : function
 * 
 * Gets today's date and returns it in a MariaDB DATE format.
 * 
 * @returns {String} : A string representing today's date.
 */
function getFormattedDate() {

  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // +1 because getMonth() starts from 0
  const day = date.getDate();

  return (`${year}-${month}-${day}`);
}

/**
 * Submit Member Info
 *
 * Router for when user submits member attendance
 */
router.post('/', function(req, res, next) {
  const response = res; // for naming issues in the callback chain

  // get form inputs, convert to lower case
  const firstname = (req.body.firstname).toLowerCase();
  const lastname = (req.body.lastname).toLowerCase();
  const email = (req.body.email).toLowerCase();
  
  // DEBUG
  console.log('Connecting into MariaDB...');
  mariadb.createConnection(connInfo)
    .then((conn) => {

      // DEBUG
      console.log('Querying the database for an ID...');

      // Query for an ID from the Members table
      conn.query(getSelectQuery(firstname, lastname, email))
        .then(res => {

          // DEBUG
          console.log('res object:');
          console.dir(res);
          console.log('res length:' + res.length);

          if (res.length == 1) { // length of 1 means that we found something
            // do the insert query
            // DEBUG
            console.log('res object, promise layer 1:');
            console.dir(res);
          }
          else {
            // render and alert user that member is not found
            response.redirect('/?renderAlert=true');
          }
        })
    })
    .catch(err => { // connection error
      // DEBUG
      console.log('Error inside submit-attendance router:');
      console.log(err);
    });
});

module.exports = router;
