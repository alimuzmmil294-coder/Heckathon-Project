import express from "express";
import {
  getDoctorDashboardStats,
  getDoctorAppointments,
  getDoctorPatients,
  getDoctorPrescriptions,
  createPrescription,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/stats", getDoctorDashboardStats);
router.get("/appointments", getDoctorAppointments);
router.get("/patients", getDoctorPatients);
router.get("/prescriptions", getDoctorPrescriptions);
router.post("/prescriptions", createPrescription);

export default router;
