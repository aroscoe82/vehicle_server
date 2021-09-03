const Lease = require("../models/lease.model.js");

// Create and Save a new Lease
exports.create = (req, res) => {
	console.log('req: ', req)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Lease
  const lease = new Lease({
		vehicle_id: req.params.vehicleId,
		miles_per_year: req.body.miles_per_year,
		lease_length: req.body.lease_length
  });

  // Save Lease in the database
  Lease.create(lease, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lease."
      });
    else res.send(data);
  });
};

// Retrieve single Lease from the database.
exports.findByVehicleId = (req, res) => {
  Lease.getByVehicleId(req.params.vehicleId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lease."
      });
    else res.send(data);
  });
};

// Retrieve single Lease from the database.
exports.findByLeaseId = (req, res) => {
  Lease.getByLeaseId(req.params.leaseId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lease."
      });
    else res.send(data);
  });
};