import express from "express";
import { getManagerStats, getManagerStaff } from "../controllers/managerController.js";

const router = express.Router();

router.get("/stats", getManagerStats);
router.get("/staff", getManagerStaff);

export default router;
