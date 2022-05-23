const Task = require("../models/task.model.js");
const Columns = require("../models/column.model.js");



// Create and Save a new Task
exports.create = (req, res) => {
  // let fileName = req.app.get('fileName');
  // console.log(fileName);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.app.get('filename'));


  // Create a Task
  const task = {
    title: req.body.title,
    noidung: req.body.noidung,
    madonhang: req.body.madonhang,
    tenkh: req.body.tenkh,
    khohang: req.body.khohang,
    soluong: req.body.soluong,
    gianhap: req.body.gianhap,
    giaban: req.body.giaban,
    trangthai: req.body.trangthai
  };

  task.hinhanh = req.app.get('filename');
  task.createDate = new Date();

  // Save Task in the database
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    else res.send(data);
  });
};

// Retrieve all Tasks from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Task.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    else res.send(data);
  });
};

// Find a single Task by Id
exports.findOne = (req, res) => {
  Task.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Task with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tasks
exports.findAllPublished = (req, res) => {
  Task.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    else res.send(data);
  });
};

// Update a Task identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const task = {
    title: req.body.title,
    noidung: req.body.noidung,
    madonhang: req.body.madonhang,
    tenkh: req.body.tenkh,
    khohang: req.body.khohang,
    soluong: req.body.soluong,
    gianhap: req.body.gianhap,
    giaban: req.body.giaban,
    trangthai: req.body.trangthai,
    hinhanh: req.body.hinhanh
  };

  task.updateDate = new Date();

  Task.updateById(
    req.params.id,
    task,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Task with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  Task.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Task with id " + req.params.id
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    else res.send({ message: `All Tasks were deleted successfully!` });
  });
};


// Get all Columns
exports.findAllColumns = (req, res) => {
  const kho = req.query.kho;
  const day = req.query.day;
  const dayEnd = req.query.dayEnd;

  let columnNameDefine;

  Columns.getAllColumn((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    else if (data) {
      columnNameDefine = data;
    }
  });

  Columns.getAll(kho, day, dayEnd, (err, data) => {
  // Columns.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    else if (data) {
      let result = {
        new: null,
        process: null,
        success: null,
        fail: null
      }
      result = data.reduce(function (r, currentValue) {
        // r[a.id] = a.id;
        // r[a.ma_column] = a.ma_column;
        // r[a.ten_column] = a.ten_column; 

        r[currentValue.ma_column] = r[currentValue.ma_column] || [];
        r[currentValue.ma_column].push(currentValue);
        return r;
      }, Object.create(null));

      let columnsData = new Array();

      let columnsDataFinal = new Array();
      for (let key of Object.keys(result)) {
        console.log(key + " -> " + result[key])

        let col = {
          id: result[key][0].ma_column,
          title: result[key][0].ten_column,
          cards: result[key]
        }
        columnsData.push(col);
      }
      console.log(columnNameDefine);
      columnNameDefine.forEach(col => {
        let cards = [];
        columnsData.forEach(data => {
          if (data.id == col.ma_column) cards = data.cards;
        });
        console.log('not have');
        let colDefault = {
          id: col.ma_column,
          title: col.ten_column,
          cards: cards
        }
        columnsDataFinal.push(colDefault);
      });
      let board = {
        columns: columnsDataFinal
      };

      res.send(board);
    }
  });
};