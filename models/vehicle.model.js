const sql = require("./db.js");

// constructor
const Vehicle = function(vehicle) {
	// this.id = vehicle.vehicle_id
  this.name = vehicle.name;
	this.type_id = vehicle.type_id;
	this.starting_mileage = vehicle.starting_mileage;
	this.starting_date = vehicle.starting_date;
	this.notes = vehicle.notes;
};

Vehicle.create = (newVehicle, result) => {
	console.log('newVehicle: ', newVehicle);
  sql.query("INSERT INTO vehicle SET ?", newVehicle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vehicle: ", { id: res.insertId, ...newVehicle });
    result(null, { id: res.insertId, ...newVehicle });
  });
};

Vehicle.findById = (vehicleId, result) => {
  sql.query(`Select * from vehicle WHERE v.vehicle_id = ${vehicleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vehicle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Vehicle with the id
    result({ kind: "not_found" }, null);
  });
};

Vehicle.getAll = result => {
  sql.query("SELECT * FROM vehicle", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicle.getAllTypes = result => {
  sql.query("SELECT * FROM vehicle_type", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vehicle types: ", res);
    result(null, res);
  });
};

module.exports = Vehicle;