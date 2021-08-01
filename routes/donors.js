import express from 'express';
import { getDonor, getDonors } from '../controllers/donors.controller.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getDonors);
router.get('/:donorId', authenticate, getDonor);

export default router;