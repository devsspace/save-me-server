const express = require('express');
const { getUser, login, signup } = require('../controllers/users.controller');
const authenticate = require('../middlewares/auth.js');
const { signupValidator } = require('../validator/auth.validator');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signupValidator, signup);
router.get('/', authenticate, getUser);

module.exports = router;