const sql = require("./db.js");

// constructor
const Lease = function(lease) {
	this.lease_id = lease.lease_id
  this.vehicle_id = lease.vehicle_id;
	this.miles_per_year = lease.miles_per_year;
	this.lease_length = lease.lease_length;
};

Lease.create = (newLease, result) => {
	console.log('newLease: ', newLease);
  sql.query("INSERT INTO lease_detail SET ?", newLease, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created lease: ", { id: res.insertId, ...newLease });
    result(null, { id: res.insertId, ...newLease });
  });
};

Lease.getByVehicleId = (vehicleId, result) => {
	console.log("Vehicle Id: ", vehicleId);
	sql.query(`SELECT * FROM lease_detail WHERE vehicle_id = ${vehicleId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found lease: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Lease with the vehicle id
		result({ kind: "not_found" }, null);
	});
};

Lease.getByLeaseId = (leaseId, result) => {
	sql.query(`SELECT * FROM lease_detail WHERE lease_id = ${leaseId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found lease: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Lease with the vehicle id
		result({ kind: "not_found" }, null);
	});
};

module.exports = Lease;