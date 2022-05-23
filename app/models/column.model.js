const sql = require("./db.js");

const Columns = function(column) {
  this.id = column.id;
  this.ma_column = column.maColumn;
  this.ten_column = column.tenColumn;
  this.cards = column.cards;
};

// Tutorial.getAll = (title, result) => {
//   let query = "SELECT * FROM tutorials";

//   if (title) {
//     query += ` WHERE title LIKE '%${title}%'`;
//   }

Columns.getAll = (kho, day, dayEnd, result) => {
  // Columns.getAll = (result) => {
  // let query = "SELECT * FROM `task-columns` as a LEFT JOIN tasks as b ON a.ma_column = b.trangthai WHERE deleted = 'N' ";
  let query = "SELECT * FROM `task-columns` as a LEFT JOIN tasks as b ON a.ma_column = b.trangthai WHERE deleted = 'N' ";
  // let query = "SELECT * FROM `task-columns`";
  if (kho) {
        query += ` AND khohang = '${kho}'`;
  }
  if (day) {
    query += ` AND '${day}' <= DATE(createDate)`;
  }
  if (dayEnd) {
    query += ` AND DATE(createDate) <= '${dayEnd}'`;
  }
  
  query += " ORDER by createDate DESC";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tasks: ", res);
      result(null, res);
    });
  };

  Columns.getAllColumn = (result) => {
    // let query = "SELECT * FROM `task-columns` as a LEFT JOIN tasks as b ON a.ma_column = b.trangthai WHERE deleted = 'N' ";
    // let query = "SELECT * FROM `task-columns` as a LEFT JOIN tasks as b ON a.ma_column = b.trangthai WHERE deleted = 'N' ORDER by createDate DESC";
    let query = "SELECT * FROM `task-columns` ORDER BY id";
    
      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("tasks: ", res);
        result(null, res);
      });
    };

  module.exports = Columns;