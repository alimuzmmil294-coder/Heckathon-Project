import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";

// @desc    Get real-time metrics for Doctor Dashboard
// @route   GET /api/doctor/stats
export const getDoctorDashboardStats = async (req, res) => {
  try {
    const patientCount = await Patient.countDocuments();
    const appointmentsToday = await Appointment.countDocuments();
    const completedCount = await Appointment.countDocuments({ status: "Completed" });
    const inProgressCount = await Appointment.countDocuments({ status: "In Progress" });

    res.json({
      success: true,
      data: {
        activePatients: patientCount,
        appointmentsToday: appointmentsToday,
        pendingLabs: 2,
        consultationsCompleted: completedCount,
        inProgressCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get doctor's live appointment queue from MongoDB
// @route   GET /api/doctor/appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      count: appointments.length,
      data: appointments.map((apt) => ({
        id: apt._id,
        patient: apt.patientName,
        time: apt.time,
        type: apt.type,
        reason: apt.reason,
        status: apt.status,
        room: apt.notes || "Exam Room 1",
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get registered patient records from MongoDB
// @route   GET /api/doctor/patients
export const getDoctorPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ fullName: 1 });
    res.json({
      success: true,
      count: patients.length,
      data: patients.map((pat) => ({
        id: pat._id,
        name: pat.fullName,
        age: pat.age,
        sex: pat.gender,
        blood: pat.bloodGroup,
        phone: pat.phone,
        chronic: pat.chronicConditions && pat.chronicConditions.length > 0 ? pat.chronicConditions.join(", ") : "None",
        allergies: pat.allergies && pat.allergies.length > 0 ? pat.allergies.join(", ") : "None",
        vitals: pat.recentVitals,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all prescriptions from MongoDB
// @route   GET /api/doctor/prescriptions
export const getDoctorPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: prescriptions.length,
      data: prescriptions.map((rx) => ({
        id: rx._id,
        patient: rx.patientName,
        drug: rx.medications && rx.medications[0] ? `${rx.medications[0].name} (${rx.medications[0].dosage})` : "Prescribed Medication",
        status: "Active",
        date: rx.dateIssued,
        medications: rx.medications,
        aiExplanation: rx.aiPlainExplanation,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create structured e-prescription and persist to MongoDB
// @route   POST /api/doctor/prescriptions
export const createPrescription = async (req, res) => {
  try {
    const { patientName, diagnosis, medications, aiPlainExplanation } = req.body;

    const formattedMeds = Array.isArray(medications)
      ? medications
      : [
          {
            name: medications || "Amoxicillin-Clavulanate",
            dosage: "875/125 mg",
            frequency: "Twice daily with meals",
            duration: "7 days",
            instructions: "Take with food",
          },
        ];

    const newPrescription = await Prescription.create({
      patientName: patientName || "Patient",
      doctorName: "Dr. Sarah Mitchell, MD",
      diagnosis: diagnosis || "Clinical Consultation & Treatment",
      medications: formattedMeds,
      aiPlainExplanation:
        aiPlainExplanation ||
        "Follow prescribed dosage instructions carefully. Complete the full course of treatment.",
      dateIssued: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });

    res.status(201).json({
      success: true,
      message: "E-Prescription saved successfully in MongoDB with AI explanation",
      data: newPrescription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
