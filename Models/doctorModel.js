const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
