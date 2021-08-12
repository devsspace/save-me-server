import express from "express";
import { askDonation, getDonations, updateDonation } from "../controllers/donation.controller.js";
import authenticate from "../middlewares/auth.js";
import { donationLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

router.get("/", authenticate, getDonations);
router.post("/", donationLimiter, authenticate, askDonation);
router.put("/:donationId", authenticate, updateDonation);

export default router;
