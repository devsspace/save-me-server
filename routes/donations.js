import express from "express";
import { askDonation, getDonations, updateDonation } from "../controllers/donation.controller.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getDonations);
router.post("/", authenticate, askDonation);
router.put("/:donationId", authenticate, updateDonation);

export default router;
