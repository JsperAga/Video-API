const mongoose = require('mongoose');
const { Schema } = mongoose;


const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // or use a `Date` if you handle both date+time in one field
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  doctor: {
    type: String // You could reference a Doctor model via ObjectId if needed
  },
  notes: {
    type: String
  }
});

const vitalsSchema = new Schema({
  date: Date,
  bloodPressure: String,
  temperature: Number,
  heartRate: Number,
  respiratoryRate: Number,
  notes: String
});

const patientSchema = new Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  contactInfo: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      province: String,
      postalCode: String,
      country: String
    }
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  medicalHistory: {
    conditions: [String],
    allergies: [String],
    surgeries: [String]
  },
  medications: [
    {
      name: String,
      dosage: String,
      frequency: String,
      prescribedBy: String
    }
  ],
  appointments: [appointmentSchema], // or define a sub-schema
  vitals: [vitalsSchema] // or define a sub-schema
});


const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Vitals = mongoose.model('Vitals', vitalsSchema);

module.exports = {
    Patient, 
    Appointment,
    Vitals
};