import express from 'express';
import { getDonor, getDonors } from '../controllers/donors.controller.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

router.get('/:donorId', authenticate, getDonor);
router.get('/', getDonors);

export default router;