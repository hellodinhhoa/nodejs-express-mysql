const sql = require("./db.js");

const Kho = function(kho) {
  this.id = kho.id;
  this.tenkho = kho.tenkho;
};

Kho.create = (newKho, result) => {
  sql.query("INSERT INTO kho SET ?", newKho, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created kho: ", { id: res.insertId, ...newKho });
    result(null, { id: res.insertId, ...newKho });
  });
};

Kho.findById = (id, result) => {
  sql.query(`SELECT * FROM kho WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found kho: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Kho with the id
    result({ kind: "not_found" }, null);
  });
};

Kho.getAll = (result) => {
  let query = "SELECT * FROM kho";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("kho: ", res);
    result(null, res);
  });
};

Kho.updateById = (id, kho, result) => {
  sql.query(
    "UPDATE kho SET ? WHERE id = ?",
    [kho, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated kho: ", { id: id, ...kho });
      result(null, { id: id, ...kho });
    }
  );
};

Kho.remove = (id, result) => {
  sql.query("DELETE FROM kho WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Kho with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted kho with id: ", id);
    result(null, res);
  });
};

module.exports = Kho;
