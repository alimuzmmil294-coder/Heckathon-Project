import express from "express";
import {
  getPatientProfile,
  getPatientAppointments,
  getPatientPrescriptions,
  bookAppointment,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/profile", getPatientProfile);
router.get("/appointments", getPatientAppointments);
router.post("/appointments", bookAppointment);
router.get("/prescriptions", getPatientPrescriptions);

export default router;
