import Staff from "../models/Staff.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

// @desc    Get real-time operational stats for Clinic Manager
// @route   GET /api/manager/stats
export const getManagerStats = async (req, res) => {
  try {
    const staffCount = await Staff.countDocuments({ status: "On Duty" });
    const totalStaff = await Staff.countDocuments();
    const patientCount = await Patient.countDocuments();
    const appointmentCount = await Appointment.countDocuments();

    res.json({
      success: true,
      data: {
        monthlyRevenue: 24500,
        staffOnDuty: staffCount,
        totalStaff: totalStaff,
        roomOccupancy: "85%",
        patientSatisfaction: "98%",
        totalPatients: patientCount,
        appointmentsScheduled: appointmentCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get clinic staff duty roster from MongoDB
// @route   GET /api/manager/staff
export const getManagerStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ staffId: 1 });
    res.json({
      success: true,
      count: staffList.length,
      data: staffList.map((member) => ({
        id: member.staffId,
        _id: member._id,
        name: member.name,
        role: member.role,
        dept: member.dept,
        shift: member.shift,
        status: member.status,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
