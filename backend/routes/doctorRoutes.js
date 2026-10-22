import express from "express";
import {
  getDoctorDashboardStats,
  getDoctorAppointments,
  createPrescription,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/stats", getDoctorDashboardStats);
router.get("/appointments", getDoctorAppointments);
router.post("/prescriptions", createPrescription);

export default router;
