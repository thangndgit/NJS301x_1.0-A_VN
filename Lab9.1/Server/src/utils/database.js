const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345679,adgjm",
  database: "node-complete",
  waitForConnections: true,
});

module.exports = pool.promise();
