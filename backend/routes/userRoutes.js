const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authentication');

const { registerUser, loginUser, getME } = require('../controller/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;