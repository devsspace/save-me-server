import express from "express";
import { getWaitingList } from '../controllers/consults.controller.js';
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getWaitingList);

export default router;