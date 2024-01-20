const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser } = require('../controllers/authController');

// middleware

router.use(cors());

router.get('/', test);
router.post('/register', registerUser);

module.exports = router;
