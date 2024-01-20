const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = require('../utils/corsOptions');
const {
  test,
  registerUser,
  loginUser,
} = require('../controllers/authController');

// middleware
router.use(cors(corsOptions));

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);

// Error handling
router.use((err, req, res, next) => {
  res
    .status(500)
    .json({ error: 'Internal Server Error. Should not be getting here' });
});

module.exports = router;
