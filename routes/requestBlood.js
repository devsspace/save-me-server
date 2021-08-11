import express from "express";
import { addBloodRequest, getRequests, updateRequest } from "../controllers/bloodRequest.controller.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, addBloodRequest);
router.get("/", authenticate, getRequests);
router.put("/:requestId", authenticate, updateRequest);

export default router;
