module.exports = app => {
  const tasks = require("../controllers/task.controller.js");

  var router = require("express").Router();

  app.use('/api/tasks', router);
  app.use('/api/columns', router);

  // get all Columns
  router.get("/all/", tasks.findAllColumns);

  // Create a new Task
  // router.post("/", upload.single('image'), tasks.create);
  router.post("/", tasks.create);

  // Update a Task with id
  router.put("/:id", tasks.update);

  // Retrieve all Tasks
  router.get("/", tasks.findAll);

  // Delete a Task with id
  router.delete("/:id", tasks.delete);

};
