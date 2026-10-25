import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Patient from "../models/Patient.js";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "medflow_secret_key_demo",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// Helper to normalize incoming role strings
const normalizeRole = (role) => {
  if (!role) return "patient";
  const r = String(role).trim().toLowerCase().replace(/\s+/g, "_");
  if (r === "manager" || r === "clinic_manager") return "clinic_manager";
  if (r === "doctor") return "doctor";
  if (r === "receptionist") return "receptionist";
  return "patient";
};

// Demo accounts map for automatic 1-click fallback seeding
const DEMO_ACCOUNTS = {
  "dr.mitchell@clinic.com": {
    name: "Dr. Sarah Mitchell",
    role: "doctor",
    specialty: "General Internal Medicine",
  },
  "alex.rivera@patient.com": {
    name: "Alex Rivera",
    role: "patient",
  },
  "admin@medflow.com": {
    name: "Director Davis",
    role: "clinic_manager",
  },
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRole = normalizeRole(role);

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create user in MongoDB
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: normalizedRole,
    });

    // If registered user is a patient, automatically initialize a linked Patient clinical record
    if (normalizedRole === "patient") {
      try {
        const existingPatient = await Patient.findOne({
          $or: [{ userId: user._id }, { fullName: user.name }],
        });

        if (!existingPatient) {
          await Patient.create({
            userId: user._id,
            fullName: user.name,
            age: 32,
            gender: "Other",
            bloodGroup: "O+",
            phone: user.phone || "+1 (555) 019-2831",
            allergies: [],
            chronicConditions: [],
            recentVitals: {
              bloodPressure: "120/80",
              heartRate: 72,
              temperature: "98.6°F",
              oxygenSaturation: "99%",
            },
          });
        }
      } catch (patientInitErr) {
        console.warn("[Auth] Patient profile initialization notice:", patientInitErr.message);
      }
    }

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("[Auth Register Error]:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user in database
    let user = await User.findOne({ email: normalizedEmail });

    // Seeded Demo Account Compatibility:
    // If user does not exist in DB but matches one of the 1-Click Demo accounts, auto-provision
    if (!user && DEMO_ACCOUNTS[normalizedEmail] && password === "password123") {
      const demoData = DEMO_ACCOUNTS[normalizedEmail];
      user = await User.create({
        name: demoData.name,
        email: normalizedEmail,
        password: "password123",
        role: demoData.role,
        specialty: demoData.specialty || "General Practice",
      });

      if (demoData.role === "patient") {
        await Patient.create({
          userId: user._id,
          fullName: demoData.name,
          age: 34,
          gender: "Male",
          bloodGroup: "O+",
          phone: "+1 (555) 602-1849",
          allergies: ["Dust Mites", "Penicillin"],
          chronicConditions: ["Mild Asthma"],
          recentVitals: {
            bloodPressure: "118/76",
            heartRate: 72,
            temperature: "98.4°F",
            oxygenSaturation: "99%",
          },
        }).catch(() => {});
      }
    }

    // Verify existence & password
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("[Auth Login Error]:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private (JWT Protected)
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user profile missing",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone,
        clinicName: req.user.clinicName,
        specialty: req.user.specialty,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error retrieving profile",
    });
  }
};
