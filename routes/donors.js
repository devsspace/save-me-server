import express from 'express';
import { getDonors } from '../controllers/donors.controller.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getDonors);

export default router;