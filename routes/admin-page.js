var express = require('express');
var router = express.Router();
var mariadb = require('mariadb');
var connInfo = require('../sql/conn-info.json');



// This variable will store the dates from the MariaDB query
let attendanceDates;

// This variable will store the attendance data from the MariaDB query
let attendanceData;

// This variable will store the member data from the MariaDB query
let memberData;



/**
 * getDatesQuery() : function
 * 
 * Creates and returns the query needed to retrieve all dates
 * from the Attendance table in MariaDB, ordered by Date ascending.
 * 
 * @returns {String} : the SELECT query
 */
function getDatesQuery() {
  return (
    `SELECT DISTINCT AttendanceDate FROM Attendance
     ORDER BY AttendanceDate ASC;`
  );
}


/**
 * getAttendanceQuery() : function
 * 
 * Creates and returns the query needed to retreive all attendance
 * entries from the Attendance table in MariaDB, ordered by Date ascending.
 * 
 * @returns {String} : the SELECT query
 */
function getAttendanceQuery() {
  return (
    `SELECT * FROM Attendance
     ORDER BY AttendanceDate ASC;`
  );
}

/**
 * getAllMembersQuery() : function
 * 
 * Creates and returns the query needed to retrieve all member
 * entries from the Members table in MariaDB.
 */
function getAllMembersQuery() {
  return (
    `SELECT * FROM Members;`
  );
}


/**
 * getFormattedDateString() : function
 * 
 * Creates a formatted date string from a JSON.stringify()'ed DATE object
 * 
 * @param {string} dateString : the JSON.stringify()'ed DATE object
 * @returns {string} : the formatted date string
 */
function getFormattedDateString(dateString) {
  return dateString.substring(9, 11) + '/' + dateString.substring(6, 8) + '/' + dateString.substring(1, 5);
}


/**
 * Processes the dates that come in from MariaDB and returns an array of formatted dates.
 * 
 * @returns { String[] } : an array of date strings in mm/dd/yyyy format
 */
function createTableHeaders() {

  let tableHeaders = ['ID', 'First Name', 'Last Name', 'Email'];

  attendanceDates.forEach(date => {
    const dateString = JSON.stringify(date["AttendanceDate"]);
    tableHeaders.push(getFormattedDateString(dateString));
  });

  return tableHeaders;
}

function createTableData(tableHeaders) {
  const IDIndex = 0;
  const displacement = 4;

  let tableData = [];

  // Creating the subarrays for 'tableData'
  memberData.forEach(item => {
    let entry = [];

    entry.push(item['ID']);
    entry.push(item['FirstName']);
    entry.push(item['LastName']);
    entry.push(item['Email'])

    for (let i = 0; i < tableHeaders.length - displacement; i++) {
      entry.push(['Absent']);
      console.log(i);
    }

    console.log('entry: ');
    console.dir(entry);
    tableData.push(entry);
  });

  // Filling in the attendance for the members
  attendanceData.forEach(item => {
    let member;

    for (let i = 0; i < tableData.length; i++) {
      const currMember = tableData[i];

      if (currMember[IDIndex] == item['MemberID']) {
        member = currMember;
        break;
      }
    }

    const dateIndex = tableHeaders.indexOf(getFormattedDateString(JSON.stringify(item['AttendanceDate'])));
    member[dateIndex] = 'Present';
  });

  return tableData;
}



/**
 * Admin Page
 * 
 * Page for Admin after they have logged in
 * 
 * Verify that the person has a sesssion, otherwise they
 * need to be redirected back to the login page
 */
router.get('/', function (req, res, next) {
  // if the user session does not exist, redirect back to the login page
  if (!req.session.userid) {
    res.redirect('admin-login');
  }

  // This is the MariaDB connection
  let connection;

  // first we should query for all unique dates, then
  // we can query for the attendance data

  // Make a connection to MariaDB
  mariadb.createConnection(connInfo)
    .then(conn => {
      connection = conn;
      return conn.query(getDatesQuery());
    })
    .then(data => {
      attendanceDates = data;
      return connection.query(getAttendanceQuery())
    })
    .then(data => {
      attendanceData = data;
      return connection.query(getAllMembersQuery());
    })
    .then(data => memberData = data)
    .catch((err) => {
      // DEBUG
      console.log('Error inside admin-page router:');
      console.log(err);
    })
    .finally(() => {
      connection.close();

      const tableHeaders = createTableHeaders();
      const tableData = createTableData(tableHeaders);

      res.render('adminpage', {
        tableHeaders: tableHeaders,
        tableData: tableData
      });
    });
});

module.exports = router;
