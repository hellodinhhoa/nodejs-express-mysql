const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

console.log(dbConfig);
var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  connectionLimit: 10
});

module.exports = connection;
