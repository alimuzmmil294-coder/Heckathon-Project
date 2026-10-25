import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes - Verifies JWT from Bearer Authorization header
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const secret = process.env.JWT_SECRET || "medflow_secret_key_demo";
      const decoded = jwt.verify(token, secret);

      // Attach user from database without password
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, user account not found",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error("[Auth Middleware] Token verification failed:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid or expired token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no bearer token provided",
    });
  }
};

/**
 * Authorize role access
 * @param  {...string} roles - Permitted roles (e.g. "doctor", "patient", "clinic_manager")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const normalizedUserRole = (req.user.role || "")
      .toLowerCase()
      .replace(/\s+/g, "_");

    const normalizedAllowedRoles = roles.map((r) =>
      r.toLowerCase().replace(/\s+/g, "_")
    );

    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
};
