module.exports = app => {
  const vehicles = require("../controllers/vehicle.controller.js");

  // Create a new Vehicle
  app.post("/vehicles", vehicles.create);

  // Retrieve all Vehicle
  app.get("/vehicles", vehicles.findAll);

	// Retrieve all Vehicle
  app.get("/vehicles/types", vehicles.findAllTypes);

  // Retrieve a single Vehicle with vehicldeId
  app.get("/vehicles/:vehicleId", vehicles.findOne);
};