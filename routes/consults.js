import express from "express";
import { addPayment, getWaitingList } from '../controllers/consults.controller.js';
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.get("/:doctorId", authenticate, getWaitingList);
router.post("/", authenticate, addPayment)

export default router;
