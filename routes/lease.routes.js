module.exports = app => {
  const leases = require("../controllers/lease.controller.js");

  // Create a new Lease
  app.post("/vehicles/:vehicleId/lease", leases.create);

  // Retrieve a single Lease with vehicle id
  app.get("/vehicles/:vehicleId/lease", leases.findByVehicleId);

	// Retrieve a single Lease with lease id
  app.get("/vehicles/:vehicleId/lease/:leaseId", leases.findByLeaseId);
};