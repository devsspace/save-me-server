import express from "express";
import { askDonation } from "../controllers/donation.controller.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, askDonation);

export default router;
