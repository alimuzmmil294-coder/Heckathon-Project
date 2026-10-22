// @desc    Get metrics for Doctor Dashboard
// @route   GET /api/doctor/stats
export const getDoctorDashboardStats = async (req, res) => {
  try {
    const stats = {
      activePatients: 24,
      appointmentsToday: 6,
      pendingLabs: 3,
      consultationsCompleted: 8,
    };
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get doctor's daily appointment queue
// @route   GET /api/doctor/appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const queue = [
      {
        id: "APT-201",
        patientName: "Emily Jenkins",
        age: 29,
        gender: "Female",
        time: "09:00 AM",
        type: "In-Person",
        reason: "Acute migraine with visual aura",
        status: "Completed",
      },
      {
        id: "APT-202",
        patientName: "Michael Chang",
        age: 52,
        gender: "Male",
        time: "10:15 AM",
        type: "Follow-up",
        reason: "Hypertension management review",
        status: "In Progress",
      },
      {
        id: "APT-203",
        patientName: "Sophia Martinez",
        age: 38,
        gender: "Female",
        time: "11:30 AM",
        type: "In-Person",
        reason: "Persistent productive cough, fatigue (AI Copilot tested)",
        status: "Confirmed",
      },
      {
        id: "APT-204",
        patientName: "David Kim",
        age: 44,
        gender: "Male",
        time: "02:00 PM",
        type: "Telehealth",
        reason: "Routine lab results review",
        status: "Confirmed",
      },
      {
        id: "APT-205",
        patientName: "Hannah Baker",
        age: 21,
        gender: "Female",
        time: "03:15 PM",
        type: "In-Person",
        reason: "Allergic rhinitis & asthma inhaler refill",
        status: "Confirmed",
      },
    ];
    res.json({ success: true, count: queue.length, data: queue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create structured e-prescription
// @route   POST /api/doctor/prescriptions
export const createPrescription = async (req, res) => {
  try {
    const { patientName, diagnosis, medications, aiPlainExplanation } = req.body;

    const newPrescription = {
      id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName || "Patient",
      doctorName: "Dr. Sarah Mitchell, MD",
      diagnosis: diagnosis || "Clinical Consultation",
      medications: medications || [],
      aiPlainExplanation: aiPlainExplanation || "Follow prescribed dosage instructions carefully.",
      dateIssued: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    res.status(201).json({
      success: true,
      message: "E-Prescription generated successfully with AI clinical explanation",
      data: newPrescription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
