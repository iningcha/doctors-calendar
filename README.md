# Doctor's Calendar Backend

## Table of Contents

- [Commands and APIs](#commands_and_APIS)
- [How to Run the Backend](#how-to-run-the-backend)

## Commands and APIs

1. (Helper to set up the database) Populate Doctors with /addDoctor with firstName and lastName as params, ex: POST localhost:5000/addDoctor?firstName=Sam&lastName=Chang 
2. Return list of doctors with /getAllDoctors GET request, ex: GET localhost:5000/getAllDoctors
3. Return list of appointments for specific Doctor & Day with /getAppointments with Doctor's firstName and lastName and date as params, ex: GET localhost:5000/getAppointments 
4. Delete appointment from a doctor's calendar by Patient's and Doctor's first and Last Name, ex: DELETE localhost:5000/deleteAppointment?firstName=Patient&lastName=Last&doctorFirst=Mitzi&doctorLast=Chang
5. Add a new appointment, takes in Patient's first and last name, Doctor's first and last name, appointment time, and appointment kind, ex: POST localhost:5000/addNewAppointment?patientFirst=Patient&patientLast=Last&doctorFirst=Sam&doctorLast=Chang&kind=new&time=8:15AM

## How to Run the Backend

- `npm install`
  - This will install all the dependencies
- `npm start`
  - Starting the web app, this will be running on localhost:5000


Known Bugs/Didn't have time to add
 - Deleting appointment deletes the appointment itself but doesn't successfully delete the reference in Doctor's appointment array
- getAppointments finds the appointments and logs in console log, but I haven't finished writing the async part to save it to the result array
- Add new appointment, didn't have time to count for 3 at the same time
