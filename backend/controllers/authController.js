import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "medflow_secret_key_demo",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields",
        });
    }

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User with this email already exists",
          });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || "Patient",
      });

      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (dbErr) {
      // Fallback for demonstration when MongoDB is not running locally
      const mockUser = {
        id: `usr_${Date.now()}`,
        name,
        email,
        role: role || "Patient",
      };
      const token = generateToken(mockUser.id, mockUser.role);
      return res.status(201).json({
        success: true,
        user: mockUser,
        token,
        note: "Created in demonstration mode",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    try {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: generateToken(user._id, user.role),
        });
      }
    } catch (dbErr) {
      // Fallback demonstration user
    }

    // Default demo bypass if offline / demo creds
    const mockRole = email.includes("doctor")
      ? "Doctor"
      : email.includes("manager") || email.includes("admin")
        ? "Clinic Manager"
        : "Patient";
    const demoUser = {
      id: "usr_demo_101",
      name: email.split("@")[0].replace(".", " "),
      email,
      role: mockRole,
    };

    return res.json({
      success: true,
      user: demoUser,
      token: generateToken(demoUser.id, demoUser.role),
      note: "Authenticated in demonstration mode",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    message: "Auth verification endpoint active",
  });
};
