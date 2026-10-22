import express from "express";
import { analyzeSymptoms } from "../controllers/aiController.js";

const router = express.Router();

router.post("/diagnose", analyzeSymptoms);

export default router;
