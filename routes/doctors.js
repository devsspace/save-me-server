import express from "express";
import { getDoctor, getDoctors } from "../controllers/doctors.controller.js";

const router = express.Router();

router.get("/:doctorId", getDoctor);
router.get("/", getDoctors);

export default router;
