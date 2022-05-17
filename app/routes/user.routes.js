module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();
  app.use('/api/users', router);

  // Create a new User
  router.post("/", users.create);

  // Update a User with id
  router.put("/:id", users.update);

  // Retrieve all Users
  router.get("/", users.findAll);

  // login
  router.post("/login", users.login);

};
