module.exports = app => {
  const kho = require("../controllers/kho.controller.js");

  var router = require("express").Router();

  app.use('/api/kho', router);
  // Create a new Kho
  router.post("/", kho.create);

  // Update a Kho with id
  router.put("/:id", kho.update);

  // Retrieve all Kho
  router.get("/", kho.findAll);

  // Delete a kho with id
  router.delete("/:id", kho.delete);

  // Delete all kho
  router.delete("/", kho.deleteAll);
  
};
