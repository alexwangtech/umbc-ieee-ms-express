var mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "testuser",
  password: "testpassword",
  connectionLimit: 5,
});

module.exports = pool;
