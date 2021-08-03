import express from 'express';
import { getUser, login, signup, updateProfile } from '../controllers/users.controller.js';
import authenticate from '../middlewares/auth.js';
import { signupValidator } from '../validator/auth.validator.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signupValidator, signup);
router.get('/', authenticate, getUser);
router.put('/', authenticate, updateProfile);

export default router;