import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";

// @desc    Get patient profile and medical record summary
// @route   GET /api/patients/profile
export const getPatientProfile = async (req, res) => {
  try {
    const mockProfile = {
      fullName: "Alex Rivera",
      age: 34,
      gender: "Male",
      bloodGroup: "O+",
      allergies: ["Penicillin", "Dust Mites"],
      chronicConditions: ["Mild Asthma"],
      vitals: {
        bloodPressure: "118/76 mmHg",
        heartRate: "72 bpm",
        temperature: "98.4°F",
        oxygenSaturation: "99%",
      },
    };
    res.json({ success: true, data: mockProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get appointments for a patient
// @route   GET /api/patients/appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = [
      {
        id: "apt_101",
        doctorName: "Dr. Sarah Mitchell, MD",
        specialty: "General Internal Medicine",
        date: "Tomorrow",
        time: "10:30 AM",
        room: "Room 304 - Primary Care Wing",
        status: "Confirmed",
        reason: "Follow-up consultation for respiratory symptom check",
      },
      {
        id: "apt_102",
        doctorName: "Dr. James Wilson",
        specialty: "Cardiology",
        date: "Nov 04, 2026",
        time: "02:15 PM",
        room: "Room 108",
        status: "Scheduled",
        reason: "Routine cardiovascular checkup",
      },
    ];
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get prescriptions for patient
// @route   GET /api/patients/prescriptions
export const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = [
      {
        id: "rx_801",
        doctorName: "Dr. Sarah Mitchell",
        diagnosis: "Acute Bronchitis & Cough",
        dateIssued: "Oct 20, 2026",
        status: "Active",
        medications: [
          {
            name: "Amoxicillin-Clavulanate (Augmentin)",
            dosage: "875/125 mg",
            frequency: "Twice daily with meals",
            duration: "7 days",
          },
          {
            name: "Benzonatate (Tessalon Perles)",
            dosage: "100 mg",
            frequency: "3 times daily as needed for cough",
            duration: "5 days",
          },
        ],
        aiExplanation:
          "Augmentin is an antibiotic prescribed to clear up the bacterial infection in your airways. Benzonatate numbs the cough reflex in your lungs so you can rest comfortably without throat irritation.",
      },
      {
        id: "rx_742",
        doctorName: "Dr. Sarah Mitchell",
        diagnosis: "Seasonal Allergies",
        dateIssued: "Sep 12, 2026",
        status: "Completed",
        medications: [
          {
            name: "Cetirizine (Zyrtec)",
            dosage: "10 mg",
            frequency: "Once daily before bedtime",
            duration: "30 days",
          },
        ],
        aiExplanation:
          "Cetirizine blocks histamine receptors to prevent itchy eyes, sneezing, and runny nose caused by seasonal airborne pollen.",
      },
    ];
    res.json({ success: true, count: prescriptions.length, data: prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Book a new appointment
// @route   POST /api/patients/appointments
export const bookAppointment = async (req, res) => {
  try {
    const { doctorName, date, time, reason } = req.body;
    const newAppointment = {
      id: `apt_${Date.now()}`,
      doctorName: doctorName || "Dr. Sarah Mitchell",
      date,
      time,
      reason,
      status: "Confirmed",
      room: "Room 304",
    };
    res.status(201).json({ success: true, message: "Appointment booked successfully", data: newAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
