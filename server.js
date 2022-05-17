const express = require("express");
const multer = require('multer');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");


const app = express();

const tasks = require("./app/controllers/task.controller");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Files upload
// app.use('/static', express.static('uploads'))
// app.use(express.static(__dirname + '/uploads'));

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.use(express.static('uploads'))
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = new Date().getTime();
    const fileName = uniquePrefix + '_' + file.originalname;
    cb(null, fileName);
    app.set('filename', fileName);
  }
});
var upload = multer({ storage: storage });
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/tasks/image-upload', upload.single('images'), tasks.create);

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ "status": 200, "error": null, "response": results });
}



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/task.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/kho.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
