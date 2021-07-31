import express from 'express';
import { getUser, login, signup } from '../controllers/users.controller.js';
import authenticate from '../middlewares/auth.js';
import { signupValidator } from '../validator/auth.validator.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signupValidator, signup);
router.get('/', authenticate, getUser);

export default router;