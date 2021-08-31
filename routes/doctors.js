import express from "express";
import { getDoctor, getDoctors, updateDoctor } from "../controllers/doctors.controller.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.get("/:doctorId", getDoctor);
router.get("/", getDoctors);
router.put("/:doctorId", authenticate, updateDoctor);
export default router;
