import express from "express";
import { addBloodRequest } from "../controllers/bloodRequest.controller.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, addBloodRequest);

export default router;
