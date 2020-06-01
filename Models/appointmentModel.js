const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  patientFirstName: String,
  patientLastName: String, 
  date: String, 
  appointmentKind: String,
  count: Number, // keeps count of how many appointments the doctor has at this time
});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
