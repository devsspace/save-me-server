import express from 'express';
import { getUser, login, signup } from '../controllers/users.controller';
import authenticate from '../middlewares/auth.js';
import { signupValidator } from '../validator/auth.validator';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signupValidator, signup);
router.get('/', authenticate, getUser);

module.exports = router;