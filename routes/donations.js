import express from "express";
import { askDonation, getDonations } from "../controllers/donation.controller.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getDonations);
router.post("/", authenticate, askDonation);

export default router;
