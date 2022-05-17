const Kho = require("../models/kho.model.js");

// Create and Save a new Kho
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Kho
  const kho = new Kho({
    tenkho: req.body.tenkho
  });

  // Save Kho in the database
  Kho.create(kho, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Kho."
      });
    else res.send(data);
  });
};

// Retrieve all Khos from the database (with condition).
exports.findAll = (req, res) => {

  Kho.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving khos."
      });
    else res.send(data);
  });
};

// Find a single Kho by Id
exports.findOne = (req, res) => {
  Kho.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Kho with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Kho with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Kho identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Kho.updateById(
    req.params.id,
    new Kho(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Kho with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Kho with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Kho with the specified id in the request
exports.delete = (req, res) => {
  Kho.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Kho with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Kho with id " + req.params.id
        });
      }
    } else res.send({ message: `Kho was deleted successfully!` });
  });
};

// Delete all Khos from the database.
exports.deleteAll = (req, res) => {
  Kho.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all khos."
      });
    else res.send({ message: `All Khos were deleted successfully!` });
  });
};
