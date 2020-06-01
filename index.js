const express = require('express')

// Create the server
const app = express()

// database with MongoDB
const mongoose = require("mongoose");

const DB_PASSWORD = "wPh4noWthmjCWi9w";
const MONGODB_URI = `mongodb+srv://samchang432:${DB_PASSWORD}@cluster0-0qqap.mongodb.net/doctors?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(MONGODB_URI, options, function(err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + MONGODB_URI + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + MONGODB_URI);
    }
});

// initialize the database Models
const Doctor = require("./Models/doctorModel");
const Appointment = require("./Models/appointmentModel");

app.post("/addDoctor", (req, res) => {
  try {
    const newDoctor = new Doctor({
          _id: new mongoose.Types.ObjectId(),
          firstName: req.query.firstName,
          lastName: req.query.lastName
        }).save();
    res.end("done");
  } catch (err) {
    console.error(err);
  }
});

// API endpoints
app.get("/getAllDoctors", (req, res) => {
  try {
    Doctor.find({}).sort('created_at').exec(function(err, doctors) {
      if (err) throw err;
      res.json(doctors);
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/getAppointments", (req, res) => {
  try {
    const filter = {"firstName": req.query.doctorFirst, "lastName": req.query.doctorLast};
    var result = [];
    async function findAppointment() {
      
      Doctor.findOne(filter, function (err, doctor) {
        if (err) console.log("err", err);

        for (const app of doctor.appointments) {
          Appointment.findOne({"_id" : app}, function (err, appointment) {
            console.log(appointment)
            result.push(appointment);
          });
        }
          
        });

        // doctor.appointments.forEach(app => {
        //   Appointment.findOne({"_id" : app}, function (err, appointment) {
        //     console.log(appointment)
        //     result += appointment;
        //   });
        // });

    }

    findAppointment();
    
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/deleteAppointment", (req, res) => {
  try {
    const docFilter = {"firstName": req.query.doctorFirst, "lastName": req.query.doctorLast};

    Doctor.findOne(docFilter, function (err, doctor) {
      if (err) console.log("err", err);
      for (const app of doctor.appointments) {
        Appointment.findOneAndDelete({"patientFirstName": req.query.patientFirst, "patientLastName": req.query.patientLast}, function (err, appointment) {
          if (appointment && appointment._id) {
            // delete from doc
            Doctor.update(docFilter,{ $pull:{appointments:{_id:appointment._id}}}, { safe: true }, function(err,deleted){
             if (err) {
              console.log(err)
             } 
            });  
          }
        });
      }
    });

    res.end("done");

  } catch (err) {
    console.error(err);
  }
});

app.post("/addNewAppointment", (req, res) => {
  try {
    // check if time is valid
    var time = req.query.time.slice(2, 4);
    console.log(time)
    if (time !== "00" && time !== "15" && time !== "30" && time !== "45") res.status(500).send("Wrong time format")
    else {
      // create appointment
      const newAppointment = new Appointment({
          _id: new mongoose.Types.ObjectId(),
          patientFirstName: req.query.patientFirst,
          patientLastName: req.query.patientLast, 
          appointmentKind: req.query.kind,
          time: req.query.time,
          count: 1, 
        });

    // save appointment and save reference to doctor
    newAppointment.save(function(err) {
      if (err) return console.log(err);
      const filter = {"firstName": req.query.doctorFirst, "lastName": req.query.doctorLast}; 
      const update = { "$push": { "appointments": newAppointment._id }};
      const options = { new: true };

      Doctor.findOneAndUpdate(filter, update, options, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!data) {
            return res.status(404).end();
        }
        return res.status(200).send(data);
      });

    })
  }
  } catch (err) {
    console.error(err);
  }
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Starting backend on ${PORT}`)
})