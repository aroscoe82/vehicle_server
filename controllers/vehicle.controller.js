const Vehicle = require("../models/vehicle.model.js");

// Create and Save a new Vehicle
exports.create = (req, res) => {
	console.log('req: ', req)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Vehicle
  const vehicle = new Vehicle({
    name: req.body.name,
		type_id: req.body.type_id,
    starting_mileage: req.body.starting_mileage,
		starting_date: req.body.starting_date,
    notes: req.body.notes
  });

  // Save Vehicle in the database
  Vehicle.create(vehicle, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle."
      });
    else res.send(data);
  });
};

// Retrieve all Vehicles from the database.
exports.findAll = (req, res) => {
  Vehicle.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles."
      });
    else res.send(data);
  });
};

// Retrieve all Vehicle Types from the database.
exports.findAllTypes = (req, res) => {
  Vehicle.getAllTypes((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicle types."
      });
    else res.send(data);
  });
};

// Find a single Vehicle with a vehicleId
exports.findOne = (req, res) => {
  Vehicle.findById(req.params.vehicleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.vehicleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Vehicle with id " + req.params.vehicleId
        });
      }
    } else res.send(data);
  });
};