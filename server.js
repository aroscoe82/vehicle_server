const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes/vehicle.routes.js")(app);
require("./routes/lease.routes.js")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the vehicle tracking application." });
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});