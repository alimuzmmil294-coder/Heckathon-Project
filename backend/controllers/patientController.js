import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";

// @desc    Get patient profile and medical record summary from MongoDB
// @route   GET /api/patients/profile
export const getPatientProfile = async (req, res) => {
  try {
    let patient = await Patient.findOne({ fullName: /Alex Rivera/i });
    if (!patient) {
      patient = await Patient.findOne();
    }

    if (!patient) {
      patient = {
        fullName: "Alex Rivera",
        age: 34,
        gender: "Male",
        bloodGroup: "O+",
        allergies: ["Penicillin", "Dust Mites"],
        chronicConditions: ["Mild Asthma"],
        recentVitals: {
          bloodPressure: "118/76",
          heartRate: 72,
          temperature: "98.4°F",
          oxygenSaturation: "99%",
        },
      };
    }

    res.json({
      success: true,
      data: {
        fullName: patient.fullName,
        age: patient.age,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        allergies: patient.allergies,
        chronicConditions: patient.chronicConditions,
        vitals: {
          bloodPressure: patient.recentVitals?.bloodPressure || "118/76 mmHg",
          heartRate: `${patient.recentVitals?.heartRate || 72} bpm`,
          temperature: patient.recentVitals?.temperature || "98.4°F",
          oxygenSaturation: patient.recentVitals?.oxygenSaturation || "99%",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get appointments for a patient from MongoDB
// @route   GET /api/patients/appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      count: appointments.length,
      data: appointments.map((apt) => ({
        id: apt._id,
        doctorName: apt.doctorName || "Dr. Sarah Mitchell, MD",
        specialty: "General Internal Medicine",
        date: apt.date || "Tomorrow",
        time: apt.time || "10:30 AM",
        room: apt.notes || "Room 304 - Primary Care Wing",
        status: apt.status || "Confirmed",
        reason: apt.reason,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get prescriptions for patient from MongoDB
// @route   GET /api/patients/prescriptions
export const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions.map((rx) => ({
        id: rx._id,
        doctorName: rx.doctorName || "Dr. Sarah Mitchell",
        diagnosis: rx.diagnosis || "Clinical Care",
        dateIssued: rx.dateIssued,
        status: "Active",
        drug: rx.medications && rx.medications[0] ? `${rx.medications[0].name} (${rx.medications[0].dosage})` : "Prescribed Medicine",
        dosage: rx.medications && rx.medications[0] ? rx.medications[0].dosage : "",
        frequency: rx.medications && rx.medications[0] ? rx.medications[0].frequency : "As directed",
        duration: rx.medications && rx.medications[0] ? rx.medications[0].duration : "7 days",
        medications: rx.medications,
        aiExplanation: rx.aiPlainExplanation || "Take this medication strictly according to your physician's directions.",
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Book a new appointment in MongoDB
// @route   POST /api/patients/appointments
export const bookAppointment = async (req, res) => {
  try {
    const { doctorName, date, time, reason } = req.body;
    const newAppointment = await Appointment.create({
      patientName: "Alex Rivera",
      doctorName: doctorName || "Dr. Sarah Mitchell",
      date: date || "Tomorrow",
      time: time || "10:30 AM",
      reason: reason || "Routine consultation checkup",
      status: "Confirmed",
      notes: "Room 304 - Primary Care Wing",
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked and persisted to MongoDB",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
