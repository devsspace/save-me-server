import express from 'express';
import { getUser, login, signup } from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/', auth, getUser);

export default router;