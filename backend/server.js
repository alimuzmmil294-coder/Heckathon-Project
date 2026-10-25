import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { seedDatabase } from "./config/seed.js";

import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Connect to MongoDB and auto-seed initial clinical documents if empty
connectDB().then(() => {
  seedDatabase();
});

// Middleware
app.use(
  cors({
    origin: [
      CLIENT_URL,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://heckathon-project-dsfo.vercel.app/",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? "connected"
      : mongoose.connection.readyState === 2
        ? "connecting"
        : "disconnected";

  res.json({
    status: "healthy",
    service: "MedFlow Core Clinical API",
    database: dbStatus,
    activeDbName:
      mongoose.connection.name || process.env.MONGO_DB_NAME || "medflow",
    environment: process.env.NODE_ENV || "development",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/manager", managerRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[MedFlow API Error]", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 [MedFlow Backend] Server running on http://localhost:${PORT}`,
  );
  console.log(`🔒 [MedFlow Backend] Accepting requests from: ${CLIENT_URL}`);
});

export default app;
